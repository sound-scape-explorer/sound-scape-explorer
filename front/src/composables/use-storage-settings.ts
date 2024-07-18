import type {StorageSettings} from 'src/common/storage-settings';
import {useStorageReader} from 'src/composables/use-storage-reader';
import {computed, ref} from 'vue';

const settings = ref<StorageSettings | null>(null);
const hasTimezone = computed(() => settings.value?.timezone !== '');

export function useStorageSettings() {
  const {read: readStorage} = useStorageReader();

  const read = async () => {
    await readStorage(async (worker, file) => {
      settings.value = await worker.readSettings(file);
    });
  };

  return {
    settings: settings,
    hasTimezone: hasTimezone,
    read: read,
  };
}
