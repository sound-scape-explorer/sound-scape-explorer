import type {DropdownOption} from 'src/common/DropdownOption';
import {NN_EXTRACTORS} from 'src/constants';
import {convertToNaiveSelectOptions} from 'src/utils/convert-to-naive-select-options';
import {parseSelectionOption} from 'src/utils/parse-selection-option';
import {reactive, watchEffect} from 'vue';

import {reducerRef, reducerSelectedRef} from './useReducers';
import {storageFileRef} from './useStorageFile';
import {workerRef} from './useWorker';

export interface Extractor {
  index: number;
  name: string;
  offset: number;
  step: number;
  persist: boolean;
}

interface ExtractorRef {
  value: Extractor | null;
}

export const extractorRef = reactive<ExtractorRef>({
  value: null,
});

interface ExtractorsRef {
  value: Extractor[] | null;
}

export const extractorsRef = reactive<ExtractorsRef>({
  value: null,
});

interface NnExtractorsRef {
  value: Extractor[] | null;
}

export const nnExtractorsRef = reactive<NnExtractorsRef>({
  value: null,
});

interface NonNnExtractorsRef {
  value: Extractor[] | null;
}

export const nonNnExtractorsRef = reactive<NonNnExtractorsRef>({
  value: null,
});

interface ExtractorSelectedRef {
  value: Extractor['name'] | null;
}

export const extractorSelectedRef = reactive<ExtractorSelectedRef>({
  value: null,
});

interface ExtractorOptionsRef {
  value: DropdownOption[];
}

export const extractorOptionsRef = reactive<ExtractorOptionsRef>({
  value: [],
});

export function useExtractors() {
  const selectExtractor = (index: number | null) => {
    if (index === null) {
      extractorRef.value = null;
      return;
    }

    if (extractorsRef.value === null) {
      return;
    }

    extractorRef.value = extractorsRef.value.filter(
      (extractor) => extractor.index === index,
    )[0];
  };

  const readExtractors = async (): Promise<void> => {
    if (workerRef.value === null || storageFileRef.value === null) {
      return;
    }

    extractorsRef.value = await workerRef.value.readExtractors(
      storageFileRef.value,
    );

    nnExtractorsRef.value = extractorsRef.value.filter((extractor) =>
      NN_EXTRACTORS.includes(extractor.name),
    );

    nonNnExtractorsRef.value = extractorsRef.value.filter(
      (extractors) => !NN_EXTRACTORS.includes(extractors.name),
    );
  };

  watchEffect(readExtractors);

  const generateExtractorOptions = () => {
    if (reducerRef.value === null) {
      extractorOptionsRef.value = [];
      return;
    }

    const options = reducerRef.value.nnExtractors.map(
      (ex) => `${ex.index} - ${ex.name}`,
    );

    extractorOptionsRef.value = convertToNaiveSelectOptions(options);
  };

  watchEffect(generateExtractorOptions);

  watchEffect(() => {
    selectExtractor(parseSelectionOption(extractorSelectedRef.value));
  });

  const resetExtractor = () => {
    extractorSelectedRef.value = null;
    extractorRef.value = null;
  };

  const autoSelectExtractor = () => {
    if (reducerSelectedRef.value === null) {
      return;
    }

    if (extractorOptionsRef.value.length !== 1) {
      return;
    }

    extractorSelectedRef.value = extractorOptionsRef.value[0].value;
  };

  watchEffect(autoSelectExtractor);

  return {
    resetExtractor: resetExtractor,
  };
}
