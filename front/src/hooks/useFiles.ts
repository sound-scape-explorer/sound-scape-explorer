import {reactive, watchEffect} from 'vue';

import {useWorker} from './useWorker';

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
  const {read} = useWorker();

  const readFiles = () =>
    read(async (worker, storage) => {
      filesRef.value = await worker.readFiles(storage);
    });

  watchEffect(readFiles);
}
