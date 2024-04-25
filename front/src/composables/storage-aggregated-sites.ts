import {useBandSelection} from 'src/composables/band-selection';
import {useSelectExtractor} from 'src/composables/extractor-selection';
import {useIntegrationSelection} from 'src/composables/integration-selection';
import {useStorageReader} from 'src/composables/storage-reader';
import {ref} from 'vue';

export interface AggregatedSite {
  site: string;
}

const aggregatedSites = ref<AggregatedSite[] | null>(null);
let isLoaded = false;

export function useStorageAggregatedSites() {
  const {read} = useStorageReader();
  const {band} = useBandSelection();
  const {integration} = useIntegrationSelection();
  const {extractor} = useSelectExtractor();

  const readAggregatedSites = async () => {
    if (isLoaded) {
      return;
    }

    isLoaded = true;

    await read(async (worker, file) => {
      if (
        band.value === null ||
        integration.value === null ||
        extractor.value === null
      ) {
        return;
      }

      aggregatedSites.value = await worker.readAggregatedSites(
        file,
        band.value.name,
        integration.value.seconds,
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
