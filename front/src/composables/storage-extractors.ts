import type {DropdownOption} from 'src/common/DropdownOption';
import {NN_EXTRACTORS} from 'src/constants';
import {reducerRef} from 'src/hooks/useReducers';
import {convertToNaiveSelectOptions} from 'src/utils/convert-to-naive-select-options';
import {onMounted, ref, watchEffect} from 'vue';

import {useStorageReader} from './storage-reader';

export interface Extractor {
  index: number;
  name: string;
  offset: number;
  step: number;
  persist: boolean;
}

let isLoaded = false;
const extractors = ref<Extractor[] | null>(null);
const nnExtractors = ref<Extractor[] | null>(null);
const nonNnExtractors = ref<Extractor[] | null>(null);
const options = ref<DropdownOption[]>([]);

export function useStorageExtractors() {
  const {read} = useStorageReader();

  const readExtractors = async () => {
    if (isLoaded) {
      return;
    }

    isLoaded = true;

    await read(async (worker, file) => {
      extractors.value = await worker.readExtractors(file);

      nnExtractors.value = extractors.value.filter((extractor) =>
        NN_EXTRACTORS.includes(extractor.name),
      );

      nonNnExtractors.value = extractors.value.filter(
        (extractors) => !NN_EXTRACTORS.includes(extractors.name),
      );
    });
  };

  onMounted(readExtractors);

  const createOptions = () => {
    if (reducerRef.value === null) {
      options.value = [];
      return;
    }

    const o = reducerRef.value.nnExtractors.map(
      (ex) => `${ex.index} - ${ex.name}`,
    );

    options.value = convertToNaiveSelectOptions(o);
  };

  watchEffect(createOptions);

  return {
    extractors: extractors,
    nnExtractors: nnExtractors,
    nonNnExtractors: nonNnExtractors,
    options: options,
  };
}
