import type {StorageSettings} from 'src/common/storage-settings';
import {useStorageReader} from 'src/composables/storage-reader';
import {useStorageReady} from 'src/composables/storage-ready';
import {ref, watch} from 'vue';

const settings = ref<StorageSettings | null>(null);
let isLoaded = false;

export function useStorageSettings() {
  const {read} = useStorageReader();
  const {isReady} = useStorageReady();

  const readAll = async () => {
    if (!isReady.value) {
      return;
    }

    if (isLoaded) {
      return;
    }

    isLoaded = true;

    await read(async (worker, file) => {
      settings.value = await worker.readSettings(file);
    });
  };

  watch(isReady, readAll);

  return {
    settings: settings,
  };
}
