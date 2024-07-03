import {useAppNotification} from 'src/app/notification/use-app-notification';
import {useDraggables} from 'src/composables/use-draggables';
import {useWorker} from 'src/composables/use-worker';
import {useOpenLock} from 'src/draggables/open/use-open-lock';
import {computed, ref} from 'vue';

const file = ref<File | null>(null);
const hasFile = computed<boolean>(() => file.value !== null);

// this is the H5 input file provided by the user
export function useStorageFile() {
  const {close: closeFile} = useWorker();
  const {notify} = useAppNotification();
  const {open, close: closeDraggable} = useDraggables();
  const {isLocked} = useOpenLock();

  const validateFile = (inputFile: File) => {
    const fileExtension = inputFile.name.split('.').pop();
    const isHDF = fileExtension === 'hdf';
    const isH5 = fileExtension === 'h5';

    if (!isHDF && !isH5) {
      const msg = `File extension ${fileExtension} is not supported`;
      notify('error', 'storage-file', msg);
      throw new Error(msg);
    }
  };

  const setFile = (inputFile: File) => {
    validateFile(inputFile);
    file.value = inputFile;
    closeDraggable('open');
    open('view');
    isLocked.value = true;
  };

  const resetFile = () => {
    closeFile();
    location.reload();
  };

  return {
    file: file,
    hasFile: hasFile,
    setFile: setFile,
    resetFile: resetFile,
  };
}
