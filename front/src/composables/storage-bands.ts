import {type DropdownOption} from 'src/common/DropdownOption';
import {convertToNaiveSelectOptions} from 'src/utils/convert-to-naive-select-options';
import {onMounted, ref, watchEffect} from 'vue';

import {reducerRef} from '../hooks/useReducers';
import {useStorageReader} from './storage-reader';

export interface Band {
  index: number;
  name: string;
  low: number;
  high: number;
}

let isLoaded = false;
const bands = ref<Band[] | null>(null);
const options = ref<DropdownOption[]>([]);

export function useStorageBands() {
  const {read} = useStorageReader();

  onMounted(async () => {
    if (isLoaded) {
      return;
    }

    isLoaded = true;

    await read(async (worker, file) => {
      bands.value = await worker.readBands(file);
    });
  });

  const generateOptions = () => {
    if (reducerRef.value === null) {
      options.value = [];
      return;
    }

    const o = reducerRef.value.bands.map(
      (band) =>
        `${band.index} - ${band.name} (${band.low} Hz - ${band.high} Hz)`,
    );

    options.value = convertToNaiveSelectOptions(o);
  };

  watchEffect(generateOptions);

  return {
    bands: bands,
    options: options,
  };
}
