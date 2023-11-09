import {appDraggablesStore} from 'src/components/AppDraggable/appDraggablesStore';
import {importLockRef} from 'src/components/Import/useImportLock';
import {computed, reactive} from 'vue';

import {workerRef} from './useWorker';

interface StorageFileRef {
  value: File | null;
}

export const storageFileRef = reactive<StorageFileRef>({
  value: null,
});

export function useStorageFile() {
  const isStorageFileRef = computed<boolean>(() => {
    return storageFileRef.value !== null;
  });

  const setFile = (file: File) => {
    if (storageFileRef.value === file) {
      return;
    }

    storageFileRef.value = file;
    appDraggablesStore.import = false;
    appDraggablesStore.selection = true;
    importLockRef.value = true;
  };

  const resetFile = () => {
    workerRef.value?.close();
    location.reload();
  };

  return {
    isStorageFileRef: isStorageFileRef,
    setFile: setFile,
    resetFile: resetFile,
  };
}
