import {useStorageReader} from 'src/composables/use-storage-reader';
import {type ExtractorDto, type IndexDto} from 'src/dtos';
import {ref} from 'vue';

const extractors = ref<ExtractorDto[] | null>(null);
const indices = ref<IndexDto[] | null>(null);

export function useExtractors() {
  const {read: r} = useStorageReader();

  const read = async () => {
    await r(async (worker, file) => {
      extractors.value = await worker.readExtractors(file);
      indices.value = await worker.readIndices(file);
    });
  };

  return {
    extractors: extractors,
    indices: indices,
    read: read,
  };
}
