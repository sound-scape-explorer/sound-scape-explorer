import {ref, watch} from 'vue';
import {storageFileRef} from './useStorageFile';
import {workerRef} from './useWorker';

type StorageFilesMetas = string[][];

export function useStorageFilesMetas() {
  const filesMetasRef = ref<StorageFilesMetas | null>(null);

  watch([workerRef, storageFileRef], async () => {
    if (storageFileRef.value === null || workerRef.value === null) {
      return;
    }

    filesMetasRef.value = await workerRef.value.readFilesMetas(
      storageFileRef.value,
    );
  });

  return {
    filesMetasRef: filesMetasRef,
  };
}
