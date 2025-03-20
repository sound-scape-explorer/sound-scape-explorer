import {useBandSelection} from 'src/composables/use-band-selection';
import {useIntegrationSelection} from 'src/composables/use-integration-selection';
import {useStorageReader} from 'src/composables/use-storage-reader';
import {useStorageReady} from 'src/composables/use-storage-ready';
import {type IndexDto} from 'src/dtos';
import {ref} from 'vue';

export interface AggregatedIndex {
  index: IndexDto;
  values: number[][];
}

const aggregatedIndices = ref<AggregatedIndex[] | null>(null);
let isLoaded = false;

export function useStorageAggregatedIndices() {
  const {read} = useStorageReader();
  const {isReady} = useStorageReady();

  const readAggregatedIndices = async () => {
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

      if (band.value === null || integration.value === null) {
        return;
      }

      const aggregated = await worker.readAggregatedIndices(
        file,
        band.value.index,
        integration.value.index,
      );

      aggregatedIndices.value = aggregated;
    });
  };

  const resetAggregatedIndices = () => {
    aggregatedIndices.value = null;
    isLoaded = false;
  };

  return {
    aggregatedIndices: aggregatedIndices,
    readAggregatedIndices: readAggregatedIndices,
    resetAggregatedIndices: resetAggregatedIndices,
  };
}
