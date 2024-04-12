import {reactive} from 'vue';

import {bandRef} from './useBands';
import {extractorRef} from './useExtractors';
import {integrationRef} from './useIntegrations';
import {useWorker} from './useWorker';

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
  const {read} = useWorker();

  const readAggregatedSites = () =>
    read(async (worker, storage) => {
      if (
        bandRef.value === null ||
        integrationRef.value === null ||
        extractorRef.value === null
      ) {
        return;
      }

      aggregatedSitesRef.value = await worker.readAggregatedSites(
        storage,
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
