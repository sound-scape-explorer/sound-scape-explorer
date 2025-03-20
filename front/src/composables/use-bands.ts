import {useStorageReader} from 'src/composables/use-storage-reader';
import {type BandDto} from 'src/dtos';
import {ref} from 'vue';

const bands = ref<BandDto[] | null>(null);

export function useBands() {
  const {read: r} = useStorageReader();

  const read = async () => {
    await r(async (worker, file) => {
      bands.value = await worker.readBands(file);
    });
  };

  return {
    bands: bands,
    read: read,
  };
}
