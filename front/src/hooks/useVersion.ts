import {reactive, watchEffect} from 'vue';

import {storageFileRef} from './useStorageFile';
import {workerRef} from './useWorker';

interface VersionRef {
  value: string | null;
}

export const versionRef = reactive<VersionRef>({
  value: null,
});

export function useVersion() {
  const readVersion = async () => {
    if (workerRef.value === null || storageFileRef.value === null) {
      return;
    }

    versionRef.value = await workerRef.value.readVersion(storageFileRef.value);
  };

  watchEffect(readVersion);
}
