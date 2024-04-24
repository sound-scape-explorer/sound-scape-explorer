import {onMounted, ref} from 'vue';

import {useStorageReader} from './storage-reader';

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

  onMounted(async () => {
    if (isLoaded) {
      return;
    }

    isLoaded = true;

    await read(async (worker, file) => {
      files.value = await worker.readFiles(file);
    });
  });

  return {
    files: files,
  };
}
