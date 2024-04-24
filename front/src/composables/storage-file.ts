import {appDraggablesStore} from 'src/components/AppDraggable/appDraggablesStore';
import {useAppNotification} from 'src/components/AppNotification/useAppNotification';
import {importLockRef} from 'src/components/Import/useImportLock';
import {computed, ref} from 'vue';

import {useWorker} from './worker';

const file = ref<File | null>(null);
const hasFile = computed<boolean>(() => file.value !== null);

export function useStorageFile() {
  const {close} = useWorker();
  const {notify} = useAppNotification();

  const validateFile = (inputFile: File) => {
    const fileExtension = inputFile.name.split('.').pop();
    const isHDF = fileExtension === 'hdf';
    const isH5 = fileExtension === 'h5';

    if (!isHDF && !isH5) {
      const msg = `File extension ${fileExtension} is not supported`;
      notify('error', 'Import', msg);
      throw new Error(msg);
    }
  };

  const setFile = (inputFile: File) => {
    validateFile(inputFile);
    file.value = inputFile;
    appDraggablesStore.import = false;
    appDraggablesStore.selection = true;
    importLockRef.value = true;
  };

  const resetFile = () => {
    close();
    location.reload();
  };

  return {
    file: file,
    hasFile: hasFile,
    setFile: setFile,
    resetFile: resetFile,
  };
}
