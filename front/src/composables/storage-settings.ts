import type {StorageSettings} from 'src/common/storage-settings';
import {useStorageReader} from 'src/composables/storage-reader';
import {useStorageReady} from 'src/composables/storage-ready';
import {computed, onMounted, ref} from 'vue';

let isLoaded = false;
const settings = ref<StorageSettings | null>(null);
const hasTimezone = computed(() => settings.value?.timezone !== '');

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

  onMounted(readAll);

  return {
    settings: settings,
    hasTimezone: hasTimezone,
  };
}
