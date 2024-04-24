import {reactive} from 'vue';

import {useFileReader} from './file-reader';
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
  const {read} = useFileReader();

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
