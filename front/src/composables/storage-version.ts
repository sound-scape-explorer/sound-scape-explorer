import {onMounted, ref} from 'vue';

import {useStorageReader} from './storage-reader';

const version = ref<string | null>(null);
let isLoaded = false;

export function useStorageVersion() {
  const {read} = useStorageReader();

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
