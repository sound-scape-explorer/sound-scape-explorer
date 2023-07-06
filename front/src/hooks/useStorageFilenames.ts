import {reactive, watchEffect} from 'vue';
import {fileRef} from './useFile';
import {workerRef} from './useWorker';

export type StorageFiles = string[];

interface FilenamesRef {
  value: StorageFiles | null;
}

export const filenamesRef = reactive<FilenamesRef>({
  value: null,
});

export function useStorageFilenames() {
  const readFilenames = async () => {
    if (fileRef.value === null || workerRef.value === null) {
      return;
    }

    filenamesRef.value = await workerRef.value.readFilenames(fileRef.value);
  };

  watchEffect(readFilenames);
}
