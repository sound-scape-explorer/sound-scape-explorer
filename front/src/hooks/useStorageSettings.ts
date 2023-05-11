import {onMounted, reactive, ref} from 'vue';
import {workerRef} from './useWorker';
import {fileRef} from './useFile';

export interface StorageSettings {
  audio_folder: string;
  audio_host: string;
  base_path: string;
  expected_sample_rate: number;
  timezone: string;
  umap_seed: number;
}

interface SettingsRef {
  value: StorageSettings | null;
}

export const settingsRef = reactive<SettingsRef>({
  value: null,
});

export function useStorageSettings() {
  onMounted(async () => {
    if (workerRef.value === null || fileRef.value === null) {
      return;
    }

    settingsRef.value = await workerRef.value.readSettings(fileRef.value);
  });

  return {
    settingsRef: settingsRef,
  };
}
