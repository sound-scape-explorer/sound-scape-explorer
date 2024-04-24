import {reactive, watchEffect} from 'vue';

import {useStorageReader} from '../composables/storage-reader';

export interface Site {
  index: number;
  name: string;
  fileIndexes: number[];
}

interface SiteRef {
  value: Site | null;
}

export const siteRef = reactive<SiteRef>({
  value: null,
});

interface SitesRef {
  value: Site[] | null;
}

export const sitesRef = reactive<SitesRef>({
  value: null,
});

export function useSites() {
  const {read} = useStorageReader();

  const readSites = () =>
    read(async (worker, file) => {
      sitesRef.value = await worker.readSites(file);
    });

  watchEffect(readSites);
}
