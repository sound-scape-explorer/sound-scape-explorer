import {useStorageReader} from 'src/composables/use-storage-reader';
import {ref} from 'vue';

export interface Site {
  index: number;
  name: string;
  fileIndexes: number[];
}

const sites = ref<Site[] | null>(null);

export function useSites() {
  const {read: readStorage} = useStorageReader();

  const read = async () => {
    await readStorage(async (worker, file) => {
      sites.value = await worker.readSites(file);
    });
  };

  return {
    sites: sites,
    read: read,
  };
}
