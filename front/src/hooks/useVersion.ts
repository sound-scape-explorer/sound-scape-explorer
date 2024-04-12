import {reactive, watchEffect} from 'vue';

import {useWorker} from './useWorker';

interface VersionRef {
  value: string | null;
}

export const versionRef = reactive<VersionRef>({
  value: null,
});

export function useVersion() {
  const {read} = useWorker();

  const readVersion = () =>
    read(async (worker, storage) => {
      versionRef.value = await worker.readVersion(storage);
    });

  watchEffect(readVersion);
}
