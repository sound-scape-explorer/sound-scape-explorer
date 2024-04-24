import {reactive, watchEffect} from 'vue';

import {useStorageReader} from '../composables/storage-reader';

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
  const {read} = useStorageReader();

  const readDigesters = () =>
    read(async (worker, file) => {
      digestersRef.value = await worker.readDigesters(file);
    });

  watchEffect(readDigesters);
}
