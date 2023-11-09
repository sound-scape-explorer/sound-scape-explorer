import {type DropdownOption} from 'src/common/DropdownOption';
import {convertToNaiveSelectOptions} from 'src/utils/convert-to-naive-select-options';
import {parseSelectionOption} from 'src/utils/parse-selection-option';
import {reactive, watchEffect} from 'vue';

import {reducerRef, reducerSelectedRef} from './useReducers';
import {storageFileRef} from './useStorageFile';
import {workerRef} from './useWorker';

export interface Band {
  index: number;
  name: string;
  low: number;
  high: number;
}

interface BandRef {
  value: Band | null;
}

interface BandsRef {
  value: Band[] | null;
}

export const bandRef = reactive<BandRef>({
  value: null,
});

export const bandsRef = reactive<BandsRef>({
  value: null,
});

interface BandSelectedRef {
  value: Band['name'] | null;
}

export const bandSelectedRef = reactive<BandSelectedRef>({
  value: null,
});

interface BandOptionsRef {
  value: DropdownOption[];
}

export const bandOptionsRef = reactive<BandOptionsRef>({
  value: [],
});

export function useBands() {
  const selectBand = (index: number | null): void => {
    if (index === null) {
      bandRef.value = null;
      return;
    }

    if (bandsRef.value === null) {
      return;
    }

    bandRef.value = bandsRef.value.filter((band) => band.index === index)[0];
  };

  const readBands = async (): Promise<void> => {
    if (workerRef.value === null || storageFileRef.value === null) {
      return;
    }

    bandsRef.value = await workerRef.value.readBands(storageFileRef.value);
  };

  watchEffect(readBands);

  const generateBandOptions = () => {
    if (reducerRef.value === null) {
      bandOptionsRef.value = [];
      return;
    }

    const options = reducerRef.value.bands.map(
      (band) =>
        `${band.index} - ${band.name} (${band.low} Hz - ${band.high} Hz)`,
    );

    bandOptionsRef.value = convertToNaiveSelectOptions(options);
  };

  watchEffect(generateBandOptions);

  watchEffect(() => {
    selectBand(parseSelectionOption(bandSelectedRef.value));
  });

  const resetBand = () => {
    bandRef.value = null;
    bandSelectedRef.value = null;
  };

  const autoSelectBand = () => {
    if (reducerSelectedRef.value === null) {
      return;
    }

    if (bandOptionsRef.value.length !== 1) {
      return;
    }

    bandSelectedRef.value = bandOptionsRef.value[0].value;
  };

  watchEffect(autoSelectBand);

  return {
    resetBand: resetBand,
  };
}
