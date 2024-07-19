import {useStorageReader} from 'src/composables/use-storage-reader';
import {ref} from 'vue';

export interface File {
  index: number;
  name: string;
  timestamp: number;
  site: string;
  labels: string[];
}

const files = ref<File[] | null>(null);

export function useFiles() {
  const {read: readStorage} = useStorageReader();

  const read = async () => {
    await readStorage(async (worker, file) => {
      files.value = await worker.readFiles(file);
    });
  };

  return {
    files: files,
    read: read,
  };
}
