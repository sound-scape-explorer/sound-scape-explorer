import {onMounted, ref} from 'vue';

import {useWorker} from './useWorker';

const version = ref<string | null>(null);
let isLoaded = false;

export function useVersion() {
  const {read} = useWorker();

  onMounted(async () => {
    if (isLoaded) {
      return;
    }

    isLoaded = true;

    await read(async (worker, file) => {
      version.value = await worker.readVersion(file);
    });
  });

  return {
    version: version,
  };
}
