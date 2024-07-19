import {useStorageReader} from 'src/composables/use-storage-reader';
import {ref} from 'vue';

export interface Band {
  index: number;
  name: string;
  low: number;
  high: number;
}

const bands = ref<Band[] | null>(null);

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
