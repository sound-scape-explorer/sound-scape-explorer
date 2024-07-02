import {useStorageReader} from 'src/composables/use-storage-reader';
import {useStorageReady} from 'src/composables/use-storage-ready';
import {onMounted, ref} from 'vue';

export interface Site {
  index: number;
  name: string;
  fileIndexes: number[];
}

const sites = ref<Site[] | null>(null);
let isLoaded = false;

export function useStorageSites() {
  const {read} = useStorageReader();
  const {isReady} = useStorageReady();

  const readAll = async () => {
    if (!isReady.value) {
      return;
    }

    if (isLoaded) {
      return;
    }

    isLoaded = true;

    await read(async (worker, file) => {
      sites.value = await worker.readSites(file);
    });
  };

  onMounted(readAll);

  return {
    sites: sites,
  };
}
