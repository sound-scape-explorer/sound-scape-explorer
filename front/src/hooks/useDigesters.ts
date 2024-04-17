import {reactive, watchEffect} from 'vue';

import {useWorker} from './useWorker';

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
  const {read} = useWorker();

  const readDigesters = () =>
    read(async (worker, storage) => {
      digestersRef.value = await worker.readDigesters(storage);
    });

  watchEffect(readDigesters);
}
