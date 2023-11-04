import {reactive} from 'vue';

import {bandRef} from './useBands';
import {extractorRef} from './useExtractors';
import {integrationRef} from './useIntegrations';
import {storageFileRef} from './useStorageFile';
import {workerRef} from './useWorker';

export interface AggregatedSite {
  site: string;
}

interface AggregatedSitesRef {
  value: AggregatedSite[] | null;
}

export const aggregatedSitesRef = reactive<AggregatedSitesRef>({
  value: null,
});

export function useAggregatedSites() {
  const readAggregatedSites = async () => {
    if (
      workerRef.value === null ||
      storageFileRef.value === null ||
      bandRef.value === null ||
      integrationRef.value === null ||
      extractorRef.value === null
    ) {
      return;
    }

    aggregatedSitesRef.value = await workerRef.value.readAggregatedSites(
      storageFileRef.value,
      bandRef.value.name,
      integrationRef.value.seconds,
      extractorRef.value.index,
    );
  };

  const resetAggregatedSites = () => {
    aggregatedSitesRef.value = null;
  };

  return {
    readAggregatedSites: readAggregatedSites,
    resetAggregatedSites: resetAggregatedSites,
  };
}
