import {useStorageReader} from 'src/composables/use-storage-reader';
import {useStorageReady} from 'src/composables/use-storage-ready';
import {NN_EXTRACTORS} from 'src/constants';
import {ref, watch} from 'vue';

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

export function useExtractorStorage() {
  const {read} = useStorageReader();
  const {isReady} = useStorageReady();

  const readExtractors = async () => {
    if (!isReady.value) {
      return;
    }

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

  watch(isReady, readExtractors);

  return {
    extractors: extractors,
    nnExtractors: nnExtractors,
    nonNnExtractors: nonNnExtractors,
  };
}
