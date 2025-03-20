import {useStorageReader} from 'src/composables/use-storage-reader';
import {type SettingsDto} from 'src/dtos';
import {computed, ref} from 'vue';

const settings = ref<SettingsDto | null>(null);
const hasTimezone = computed(() => settings.value?.timezone !== '');

export function useSettings() {
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
