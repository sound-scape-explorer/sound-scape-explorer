import {reactive, watchEffect} from 'vue';
import {storageFileRef} from './useStorageFile';
import {workerRef} from './useWorker';

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
  const readSites = async () => {
    if (workerRef.value === null || storageFileRef.value === null) {
      return;
    }

    sitesRef.value = await workerRef.value.readSites(storageFileRef.value);
  };

  watchEffect(readSites);
}
