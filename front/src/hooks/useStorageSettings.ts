import {onMounted, reactive} from 'vue';
import {workerRef} from './useWorker';
import {fileRef} from './useFile';
import type {StorageSettings} from 'src/storage/StorageSettings';
import {useAudioHost} from './useAudioHost';

interface SettingsRef {
  value: StorageSettings | null;
}

export const settingsRef = reactive<SettingsRef>({
  value: null,
});

export function useStorageSettings() {
  const {setAudioHost} = useAudioHost();

  onMounted(async () => {
    if (workerRef.value === null || fileRef.value === null) {
      return;
    }

    settingsRef.value = await workerRef.value.readSettings(fileRef.value);

    setAudioHost();
  });

  return {
    settingsRef: settingsRef,
  };
}
