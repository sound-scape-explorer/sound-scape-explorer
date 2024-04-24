import type {StorageSettings} from 'src/storage/StorageSettings';
import {onMounted, ref} from 'vue';

import {useStorageReader} from './storage-reader';

const settings = ref<StorageSettings | null>(null);
let isLoaded = false;

export function useStorageSettings() {
  const {read} = useStorageReader();

  onMounted(async () => {
    if (isLoaded) {
      return;
    }

    isLoaded = true;

    await read(async (worker, file) => {
      settings.value = await worker.readSettings(file);
    });
  });

  return {
    settings: settings,
  };
}
