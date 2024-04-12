import {reactive, watchEffect} from 'vue';

import {useWorker} from './useWorker';

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
  const {read} = useWorker();

  const readSites = () =>
    read(async (worker, storage) => {
      sitesRef.value = await worker.readSites(storage);
    });

  watchEffect(readSites);
}
