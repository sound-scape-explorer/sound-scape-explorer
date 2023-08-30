import {reactive, watchEffect} from 'vue';

import {storageFileRef} from './useStorageFile';
import {workerRef} from './useWorker';

export interface Digester {
  index: number;
  name: string;
}

interface DigestersRef {
  value: Digester[] | null;
}

export const digestersRef = reactive<DigestersRef>({
  value: null,
});

export function useDigesters() {
  const readDigesters = async () => {
    if (workerRef.value === null || storageFileRef.value === null) {
      return;
    }

    digestersRef.value = await workerRef.value.readDigesters(
      storageFileRef.value,
    );
  };

  watchEffect(readDigesters);
}
