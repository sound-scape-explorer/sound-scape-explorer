import {useStorageReader} from 'src/composables/use-storage-reader';
import {NN_EXTRACTORS} from 'src/constants';
import {ref} from 'vue';

export interface Extractor {
  index: number;
  name: string;
  offset: number;
  step: number;
  persist: boolean;
}

const extractors = ref<Extractor[] | null>(null);
const nnExtractors = ref<Extractor[] | null>(null);
const nonNnExtractors = ref<Extractor[] | null>(null);

export function useExtractorStorage() {
  const {read: r} = useStorageReader();

  const read = async () => {
    await r(async (worker, file) => {
      extractors.value = await worker.readExtractors(file);

      nnExtractors.value = extractors.value.filter((extractor) =>
        NN_EXTRACTORS.includes(extractor.name),
      );

      nonNnExtractors.value = extractors.value.filter(
        (extractors) => !NN_EXTRACTORS.includes(extractors.name),
      );
    });
  };

  return {
    extractors: extractors,
    nnExtractors: nnExtractors,
    nonNnExtractors: nonNnExtractors,
    read: read,
  };
}
