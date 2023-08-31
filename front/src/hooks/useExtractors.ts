import {reactive, watchEffect} from 'vue';

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

export function useExtractors() {
  const nnExtractors = ['vgg'];

  const selectExtractor = (index: number | null) => {
    if (index === null) {
      extractorRef.value === null;
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
      nnExtractors.includes(extractor.name),
    );

    nonNnExtractorsRef.value = extractorsRef.value.filter(
      (extractors) => !nnExtractors.includes(extractors.name),
    );
  };

  watchEffect(readExtractors);

  return {
    selectExtractor: selectExtractor,
  };
}
