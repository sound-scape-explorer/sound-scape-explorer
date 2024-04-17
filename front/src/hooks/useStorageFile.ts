import {appDraggablesStore} from 'src/components/AppDraggable/appDraggablesStore';
import {useNotification} from 'src/components/AppNotification/useNotification';
import {importLockRef} from 'src/components/Import/useImportLock';
import {computed, reactive} from 'vue';

import {useWorker} from './useWorker';

interface StorageFileRef {
  value: File | null;
}

export const storageFileRef = reactive<StorageFileRef>({
  value: null,
});

export function useStorageFile() {
  const {close} = useWorker();
  const {notify} = useNotification();

  const isStorageFileRef = computed<boolean>(() => {
    return storageFileRef.value !== null;
  });

  const validateFile = (file: File) => {
    const fileExtension = file.name.split('.').pop();
    const isHDF = fileExtension === 'hdf';
    const isH5 = fileExtension === 'h5';

    if (!isHDF && !isH5) {
      const msg = `File extension ${fileExtension} is not supported`;
      notify('error', 'Import', msg);
      throw new Error(msg);
    }
  };

  const setFile = (file: File) => {
    validateFile(file);

    if (storageFileRef.value === file) {
      return;
    }

    storageFileRef.value = file;
    appDraggablesStore.import = false;
    appDraggablesStore.selection = true;
    importLockRef.value = true;
  };

  const resetFile = () => {
    close();
    location.reload();
  };

  return {
    isStorageFileRef: isStorageFileRef,
    setFile: setFile,
    resetFile: resetFile,
  };
}
