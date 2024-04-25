import {useStorageReader} from 'src/composables/storage-reader';
import {onMounted, ref} from 'vue';

export interface Band {
  index: number;
  name: string;
  low: number;
  high: number;
}

let isLoaded = false;
const bands = ref<Band[] | null>(null);

export function useBandStorage() {
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

  return {
    bands: bands,
  };
}
