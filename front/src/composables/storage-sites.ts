import {onMounted, ref} from 'vue';

import {useStorageReader} from './storage-reader';

export interface Site {
  index: number;
  name: string;
  fileIndexes: number[];
}

const sites = ref<Site[] | null>(null);
let isLoaded = false;

export function useStorageSites() {
  const {read} = useStorageReader();

  onMounted(async () => {
    if (isLoaded) {
      return;
    }

    isLoaded = true;

    await read(async (worker, file) => {
      sites.value = await worker.readSites(file);
    });
  });

  return {
    sites: sites,
  };
}
