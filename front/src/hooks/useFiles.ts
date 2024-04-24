import {reactive, watchEffect} from 'vue';

import {useFileReader} from './file-reader';

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
  const {read} = useFileReader();

  const readFiles = () =>
    read(async (worker, file) => {
      filesRef.value = await worker.readFiles(file);
    });

  watchEffect(readFiles);
}
