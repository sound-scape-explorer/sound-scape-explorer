import {useStorageReader} from 'src/composables/use-storage-reader';
import {useStorageReady} from 'src/composables/use-storage-ready';
import {ref, watch} from 'vue';

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
  const {isReady} = useStorageReady();

  const readAll = async () => {
    if (!isReady.value) {
      return;
    }

    if (isLoaded) {
      return;
    }

    isLoaded = true;

    await read(async (worker, file) => {
      bands.value = await worker.readBands(file);
    });
  };

  watch(isReady, readAll);

  return {
    bands: bands,
  };
}
