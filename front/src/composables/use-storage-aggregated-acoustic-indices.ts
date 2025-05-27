import {type IndexDto} from '@shared/dtosOLD';
import {useSitesNew} from 'src/composables/use-sites-new';
import {useStorageReader} from 'src/composables/use-storage-reader';
import {useStorageReady} from 'src/composables/use-storage-ready';
import {useViewSelection} from 'src/composables/use-view-selection';
import {ref} from 'vue';

export interface AggregatedIndex {
  index: IndexDto;
  values: number[][];
}

const aggregatedIndices = ref<AggregatedIndex[] | null>(null);
let isLoaded = false;

// todo: this is regression? (metrics)
export function useStorageAggregatedAcousticIndices() {
  const {read} = useStorageReader();
  const {isReady} = useStorageReady();
  const {sites} = useSitesNew();

  const readAggregatedIndices = async () => {
    if (!isReady.value) {
      return;
    }

    if (isLoaded) {
      return;
    }

    isLoaded = true;

    await read(async (worker, file) => {
      const {band, integration} = useViewSelection();

      if (band.value === null || integration.value === null) {
        return;
      }

      const aggregated = await worker.readAggregatedAcousticIndices(
        file,
        band.value.index,
        integration.value.index,
        Object.keys(sites.value),
      );

      aggregatedIndices.value = aggregated;
    });
  };

  const resetAggregatedIndices = () => {
    aggregatedIndices.value = null;
    isLoaded = false;
  };

  return {
    aggregatedIndices,
    readAggregatedIndices,
    resetAggregatedIndices,
  };
}
