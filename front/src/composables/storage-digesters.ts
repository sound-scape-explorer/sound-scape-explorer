import {useStorageReader} from 'src/composables/storage-reader';
import {useStorageReady} from 'src/composables/storage-ready';
import {ref, watch} from 'vue';

export interface Digester {
  index: number;
  name: string;
}

const digesters = ref<Digester[] | null>(null);
let isLoaded = false;

export function useStorageDigesters() {
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
      digesters.value = await worker.readDigesters(file);
    });
  };

  watch(isReady, readAll);

  return {
    digesters: digesters,
  };
}
