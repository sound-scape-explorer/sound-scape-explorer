import {useAppNotification} from 'src/app/notification/use-app-notification';
import {useStorageFile} from 'src/composables/use-storage-file';
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
      if (worker.value === null && file.value !== null) {
        // noinspection ExceptionCaughtLocallyJS
        throw new Error('no worker');
      }

      if (worker.value !== null && file.value === null) {
        // noinspection ExceptionCaughtLocallyJS
        throw new Error('no storage');
      }

      if (worker.value === null || file.value === null) {
        // noinspection ExceptionCaughtLocallyJS
        throw new Error('no worker or storage');
      }

      await callback(worker.value, file.value);
    } catch (error: unknown) {
      if (error instanceof Error) {
        const message = `${error.message}`;
        console.error(message);
        notify('error', 'storage-reader', message);
        throw new Error(error.message);
      }
    }
  };

  return {
    read: read,
  };
}
