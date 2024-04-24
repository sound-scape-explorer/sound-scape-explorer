import {useAppNotification} from 'src/components/AppNotification/useAppNotification';
import {useStorageFile} from 'src/composables/storage-file';
import {useWorker, type Worker} from 'src/composables/worker';

export function useStorageReader() {
  const {worker} = useWorker();
  const {file} = useStorageFile();
  const {notify} = useAppNotification();

  const read = async (
    // eslint-disable-next-line no-unused-vars
    callback: (worker: Worker, file: File) => Promise<unknown>,
  ) => {
    try {
      if (worker.value === null || file.value === null) {
        // noinspection ExceptionCaughtLocallyJS
        throw new Error('Worker/Read: worker or storage is undefined');
      }

      await callback(worker.value, file.value);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(`Worker/Read: ${error.message}`);
        notify('error', 'Worker/Read', error.message);
        throw new Error(error.message);
      }
    }
  };

  return {
    read: read,
  };
}
