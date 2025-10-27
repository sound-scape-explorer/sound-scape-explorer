import {type IndexDto} from '@shared/dtosOLD';
import {useSites} from 'src/composables/use-sites';
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
// TODO: to remove
// TODO: to remove ALL
export function useStorageAggregatedAcousticIndices() {
  const {read} = useStorageReader();
  const {isReady} = useStorageReady();
  const {sites} = useSites();

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
        sites.value.map((s) => s.name),
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
