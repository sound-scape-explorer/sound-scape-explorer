import {reactive, watchEffect} from 'vue';
import {workerRef} from './useWorker';
import {fileRef} from './useFile';

export interface ConfigFile {
  index: number;
  name: string;
  timestamp: number;
  site: string;
  meta: string[];
}

interface ConfigFilesRef {
  value: ConfigFile[] | null;
}

export const configFilesRef = reactive<ConfigFilesRef>({
  value: null,
});

export function useConfigFiles() {
  const readFiles = async () => {
    if (workerRef.value === null || fileRef.value === null) {
      return;
    }

    configFilesRef.value = await workerRef.value.readConfigFiles(fileRef.value);
    console.log(configFilesRef.value);
  };

  watchEffect(readFiles);
}
