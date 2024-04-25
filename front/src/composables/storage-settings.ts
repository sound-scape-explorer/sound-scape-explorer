import type {StorageSettings} from 'src/common/storage-settings';
import {useStorageReader} from 'src/composables/storage-reader';
import {onMounted, ref} from 'vue';

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
