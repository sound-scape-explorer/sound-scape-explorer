import {onMounted, ref} from 'vue';

import {useFileReader} from './file-reader';

const version = ref<string | null>(null);
let isLoaded = false;

export function useVersion() {
  const {read} = useFileReader();

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
