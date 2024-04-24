import {reactive, watchEffect} from 'vue';

import {useFileReader} from './file-reader';

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
  const {read} = useFileReader();

  const readSites = () =>
    read(async (worker, file) => {
      sitesRef.value = await worker.readSites(file);
    });

  watchEffect(readSites);
}
