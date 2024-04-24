import {onMounted, ref} from 'vue';

import {useAppNotification} from '../components/AppNotification/useAppNotification';
import {storageFileRef} from './useStorageFile';

export type Worker = typeof import('../workers/worker');
const worker = ref<Worker | null>(null);
let isLoaded = false;

export function useWorker() {
  const {notify} = useAppNotification();

  const read = async (
    // eslint-disable-next-line no-unused-vars
    callback: (worker: Worker, storage: File) => Promise<unknown>,
  ) => {
    try {
      if (!isLoaded) {
        // noinspection ExceptionCaughtLocallyJS
        throw new Error('Worker: Not loaded');
      }

      if (worker.value === null || storageFileRef.value === null) {
        // noinspection ExceptionCaughtLocallyJS
        throw new Error('Worker/Read: worker or storage is undefined');
      }

      await callback(worker.value, storageFileRef.value);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(`Worker/Read: ${error.message}`);
        notify('error', 'Worker/Read', error.message);
        throw new Error(error.message);
      }
    }
  };

  const close = () => {
    worker.value?.close();
  };

  onMounted(() => {
    if (isLoaded) {
      return;
    }

    isLoaded = true;

    worker.value = new ComlinkWorker<Worker>(
      new URL('../workers/worker', import.meta.url),
    );
  });

  return {
    worker: worker,
    read: read,
    close: close,
  };
}
