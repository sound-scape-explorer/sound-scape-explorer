import {useAppNotification} from 'src/components/AppNotification/useAppNotification';
import {importLockRef} from 'src/components/Import/useImportLock';
import {useDraggables} from 'src/composables/draggables';
import {useWorker} from 'src/composables/worker';
import {computed, ref} from 'vue';

const file = ref<File | null>(null);
const hasFile = computed<boolean>(() => file.value !== null);

// this is the H5 input file provided by the user
export function useStorageFile() {
  const {close} = useWorker();
  const {notify} = useAppNotification();
  const {store} = useDraggables();

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
    store.import = false;
    store.selection = true;
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
