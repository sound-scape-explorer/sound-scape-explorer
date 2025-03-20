import {useBandSelection} from 'src/composables/use-band-selection';
import {useExtractors} from 'src/composables/use-extractors';
import {useIntegrationSelection} from 'src/composables/use-integration-selection';
import {useStorageReader} from 'src/composables/use-storage-reader';
import {useStorageReady} from 'src/composables/use-storage-ready';
import {type ExtractorDto} from 'src/dtos';
import {ref} from 'vue';

export interface AggregatedIndicator {
  extractor: ExtractorDto;
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
      const {indices} = useExtractors();

      if (
        band.value === null ||
        integration.value === null ||
        indices.value === null
      ) {
        return;
      }

      // look at my name
      const indicesIndices = indices.value.map((i) => i.index);

      const aggregated = await worker.readAggregatedIndicators(
        file,
        band.value.name,
        integration.value.seconds,
        indicesIndices,
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
