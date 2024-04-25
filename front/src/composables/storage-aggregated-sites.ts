import {ref} from 'vue';

import {extractorRef} from '../hooks/useExtractors';
import {integrationRef} from '../hooks/useIntegrations';
import {useBandSelection} from './band-selection';
import {useStorageReader} from './storage-reader';

export interface AggregatedSite {
  site: string;
}

const aggregatedSites = ref<AggregatedSite[] | null>(null);
let isLoaded = false;

export function useStorageAggregatedSites() {
  const {read} = useStorageReader();
  const {band} = useBandSelection();

  const readAggregatedSites = async () => {
    if (isLoaded) {
      return;
    }

    isLoaded = true;

    await read(async (worker, file) => {
      if (
        band.value === null ||
        integrationRef.value === null ||
        extractorRef.value === null
      ) {
        return;
      }

      aggregatedSites.value = await worker.readAggregatedSites(
        file,
        band.value.name,
        integrationRef.value.seconds,
        extractorRef.value.index,
      );
    });
  };

  const resetAggregatedSites = () => {
    aggregatedSites.value = null;
    isLoaded = false;
  };

  return {
    aggregatedSites: aggregatedSites,
    readAggregatedSites: readAggregatedSites,
    resetAggregatedSites: resetAggregatedSites,
  };
}
