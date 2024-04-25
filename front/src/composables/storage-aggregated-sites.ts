import {useBandSelection} from 'src/composables/band-selection';
import {useExtractorSelection} from 'src/composables/extractor-selection';
import {useStorageReader} from 'src/composables/storage-reader';
import {integrationRef} from 'src/hooks/useIntegrations';
import {ref} from 'vue';

export interface AggregatedSite {
  site: string;
}

const aggregatedSites = ref<AggregatedSite[] | null>(null);
let isLoaded = false;

export function useStorageAggregatedSites() {
  const {read} = useStorageReader();
  const {band} = useBandSelection();
  const {extractor} = useExtractorSelection();

  const readAggregatedSites = async () => {
    if (isLoaded) {
      return;
    }

    isLoaded = true;

    await read(async (worker, file) => {
      if (
        band.value === null ||
        integrationRef.value === null ||
        extractor.value === null
      ) {
        return;
      }

      aggregatedSites.value = await worker.readAggregatedSites(
        file,
        band.value.name,
        integrationRef.value.seconds,
        extractor.value.index,
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
