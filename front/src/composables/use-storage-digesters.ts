import {useStorageReader} from 'src/composables/use-storage-reader';
import {useStorageReady} from 'src/composables/use-storage-ready';
import {onMounted, ref} from 'vue';

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

  onMounted(readAll);

  return {
    digesters: digesters,
  };
}
