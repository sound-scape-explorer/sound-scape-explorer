import {reactive, watchEffect} from 'vue';

import {useFileReader} from './file-reader';

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
  const {read} = useFileReader();

  const readDigesters = () =>
    read(async (worker, storage) => {
      digestersRef.value = await worker.readDigesters(storage);
    });

  watchEffect(readDigesters);
}
