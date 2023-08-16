import {reactive, watchEffect} from 'vue';

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

  return {
    selectBand: selectBand,
  };
}
