import {StorageReaderError} from 'src/common/Errors';
import {useStorageFile} from 'src/composables/use-storage-file';
import {useWorker, type Worker} from 'src/composables/use-worker';

export function useStorageReader() {
  const {worker} = useWorker();
  const {file} = useStorageFile();

  const read = async (
    // eslint-disable-next-line no-unused-vars
    callback: (worker: Worker, file: File) => Promise<unknown>,
  ) => {
    if (worker.value === null && file.value !== null) {
      throw new StorageReaderError('no worker');
    }

    if (worker.value !== null && file.value === null) {
      throw new StorageReaderError('no storage');
    }

    if (worker.value === null || file.value === null) {
      throw new StorageReaderError('no worker or storage');
    }

    await callback(worker.value, file.value);
  };

  return {
    read: read,
  };
}
