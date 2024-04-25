import {onMounted, ref} from 'vue';

import {useStorageReader} from './storage-reader';

export interface Digester {
  index: number;
  name: string;
}

const digesters = ref<Digester[] | null>(null);
let isLoaded = false;

export function useStorageDigesters() {
  const {read} = useStorageReader();

  onMounted(async () => {
    if (isLoaded) {
      return;
    }

    isLoaded = true;

    await read(async (worker, file) => {
      digesters.value = await worker.readDigesters(file);
    });
  });

  return {
    digesters: digesters,
  };
}
