import {useBandSelection} from 'src/composables/use-band-selection';
import {useExtractorSelection} from 'src/composables/use-extractor-selection';
import {useIntegrationSelection} from 'src/composables/use-integration-selection';
import {useStorageReader} from 'src/composables/use-storage-reader';
import {useStorageReady} from 'src/composables/use-storage-ready';
import {ref} from 'vue';

export type AggregatedLabels = string[][];

const aggregatedLabels = ref<AggregatedLabels | null>(null);
let isLoaded = false;

export function useStorageAggregatedLabels() {
  const {read} = useStorageReader();
  const {isReady} = useStorageReady();

  const readAggregatedLabels = async () => {
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
      const {extractor} = useExtractorSelection();

      if (
        band.value === null ||
        integration.value === null ||
        extractor.value === null
      ) {
        return;
      }

      aggregatedLabels.value = await worker.readAggregatedLabels(
        file,
        band.value.name,
        integration.value.seconds,
        extractor.value.index,
      );
    });
  };

  const resetAggregatedLabels = () => {
    aggregatedLabels.value = null;
    isLoaded = false;
  };

  return {
    aggregatedLabels: aggregatedLabels,
    readAggregatedLabels: readAggregatedLabels,
    resetAggregatedLabels: resetAggregatedLabels,
  };
}
