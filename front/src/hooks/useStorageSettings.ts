import type {StorageSettings} from 'src/storage/StorageSettings';
import {onMounted, reactive} from 'vue';

import {useAudioHost} from './useAudioHost';
import {useWorker} from './useWorker';

interface SettingsRef {
  value: StorageSettings | null;
}

export const settingsRef = reactive<SettingsRef>({
  value: null,
});

export function useStorageSettings() {
  const {read} = useWorker();
  const {setAudioHost} = useAudioHost();

  const readSettings = () =>
    read(async (worker, storage) => {
      settingsRef.value = await worker.readSettings(storage);

      setAudioHost();
    });

  onMounted(readSettings);

  return {
    settingsRef: settingsRef,
  };
}
