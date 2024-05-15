import {useStorageReader} from 'src/composables/storage-reader';
import {useStorageReady} from 'src/composables/storage-ready';
import {onMounted, ref} from 'vue';

export interface File {
  index: number;
  name: string;
  timestamp: number;
  site: string;
  labels: string[];
}

const files = ref<File[] | null>(null);
let isLoaded = false;

export function useStorageFiles() {
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
      files.value = await worker.readFiles(file);
    });
  };

  onMounted(readAll);

  return {
    files: files,
  };
}
