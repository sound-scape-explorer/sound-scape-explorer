import {useBandSelection} from 'src/composables/band-selection';
import {
  type Extractor,
  useExtractorStorage,
} from 'src/composables/extractor-storage';
import {useIntegrationSelection} from 'src/composables/integration-selection';
import {useStorageReader} from 'src/composables/storage-reader';
import {useStorageReady} from 'src/composables/storage-ready';
import {ref} from 'vue';

export interface AggregatedIndicator {
  extractor: Extractor;
  values: number[][];
}

const aggregatedIndicators = ref<AggregatedIndicator[] | null>(null);
let isLoaded = false;

export function useStorageAggregatedIndicators() {
  const {read} = useStorageReader();
  const {isReady} = useStorageReady();

  const readAggregatedIndicators = async () => {
    if (!isReady.value) {
      return;
    }

    if (isLoaded) {
      return;
    }

    isLoaded = true;

    await read(async (worker, file) => {
      const {band} = useBandSelection();
      const {integration} = useIntegrationSelection();
      const {nonNnExtractors} = useExtractorStorage();

      if (
        band.value === null ||
        integration.value === null ||
        nonNnExtractors.value === null
      ) {
        return;
      }

      const extractorsIndexes = nonNnExtractors.value.map((ex) => ex.index);

      const aggregated = await worker.readAggregatedIndicators(
        file,
        band.value.name,
        integration.value.seconds,
        extractorsIndexes,
      );

      aggregatedIndicators.value = aggregated;
    });
  };

  const resetAggregatedIndicators = () => {
    aggregatedIndicators.value = null;
    isLoaded = false;
  };

  return {
    aggregatedIndicators: aggregatedIndicators,
    readAggregatedIndicators: readAggregatedIndicators,
    resetAggregatedIndicators: resetAggregatedIndicators,
  };
}
