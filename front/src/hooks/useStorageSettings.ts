import type {StorageSettings} from 'src/storage/StorageSettings';
import {onMounted, reactive} from 'vue';

import {useAudioHost} from './useAudioHost';
import {storageFileRef} from './useStorageFile';
import {workerRef} from './useWorker';

interface SettingsRef {
  value: StorageSettings | null;
}

export const settingsRef = reactive<SettingsRef>({
  value: null,
});

export function useStorageSettings() {
  const {setAudioHost} = useAudioHost();

  onMounted(async () => {
    if (workerRef.value === null || storageFileRef.value === null) {
      return;
    }

    settingsRef.value = await workerRef.value.readSettings(
      storageFileRef.value,
    );

    setAudioHost();
  });

  return {
    settingsRef: settingsRef,
  };
}
