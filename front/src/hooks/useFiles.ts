import {reactive, watchEffect} from 'vue';
import {workerRef} from './useWorker';
import {storageFileRef} from './useStorageFile';

export interface File {
  index: number;
  name: string;
  timestamp: number;
  site: string;
  labels: string[];
}

interface FilesRef {
  value: File[] | null;
}

export const filesRef = reactive<FilesRef>({
  value: null,
});

export function useFiles() {
  const readFiles = async () => {
    if (workerRef.value === null || storageFileRef.value === null) {
      return;
    }

    filesRef.value = await workerRef.value.readFiles(storageFileRef.value);
  };

  watchEffect(readFiles);
}
