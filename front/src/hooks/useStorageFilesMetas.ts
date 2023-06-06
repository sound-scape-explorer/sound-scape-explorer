import {ref, watch} from 'vue';
import {fileRef} from './useFile';
import {workerRef} from './useWorker';

type StorageFilesMetas = string[][];

export function useStorageFilesMetas() {
  const filesMetasRef = ref<StorageFilesMetas | null>(null);

  watch([workerRef, fileRef], async () => {
    if (fileRef.value === null || workerRef.value === null) {
      return;
    }

    filesMetasRef.value = await workerRef.value.readFilesMetas(fileRef.value);
  });

  return {
    filesMetasRef: filesMetasRef,
  };
}
