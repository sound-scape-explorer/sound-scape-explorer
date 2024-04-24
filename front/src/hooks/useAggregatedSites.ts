import {reactive} from 'vue';

import {useStorageReader} from '../composables/storage-reader';
import {bandRef} from './useBands';
import {extractorRef} from './useExtractors';
import {integrationRef} from './useIntegrations';

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
  const {read} = useStorageReader();

  const readAggregatedSites = () =>
    read(async (worker, file) => {
      if (
        bandRef.value === null ||
        integrationRef.value === null ||
        extractorRef.value === null
      ) {
        return;
      }

      aggregatedSitesRef.value = await worker.readAggregatedSites(
        file,
        bandRef.value.name,
        integrationRef.value.seconds,
        extractorRef.value.index,
      );
    });

  const resetAggregatedSites = () => {
    aggregatedSitesRef.value = null;
  };

  return {
    readAggregatedSites: readAggregatedSites,
    resetAggregatedSites: resetAggregatedSites,
  };
}
