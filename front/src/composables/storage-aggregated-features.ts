import {useBandSelection} from 'src/composables/band-selection';
import {useSelectExtractor} from 'src/composables/extractor-selection';
import {useIntegrationSelection} from 'src/composables/integration-selection';
import {useStorageReader} from 'src/composables/storage-reader';
import {useStorageReady} from 'src/composables/storage-ready';
import {ref} from 'vue';

type AggregatedFeatures = number[][];
const aggregatedFeatures = ref<AggregatedFeatures | null>(null);
let isLoaded = false;

export function useStorageAggregatedFeatures() {
  const {read} = useStorageReader();
  const {isReady} = useStorageReady();

  const readAggregatedFeatures = async () => {
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
      const {extractor} = useSelectExtractor();

      if (
        band.value === null ||
        integration.value === null ||
        extractor.value === null
      ) {
        return;
      }

      aggregatedFeatures.value = await worker.readAggregatedFeatures(
        file,
        band.value.name,
        integration.value.seconds,
        extractor.value.index,
      );
    });
  };

  const resetAggregatedFeatures = () => {
    aggregatedFeatures.value = null;
    isLoaded = false;
  };

  return {
    aggregatedFeatures: aggregatedFeatures,
    readAggregatedFeatures: readAggregatedFeatures,
    resetAggregatedFeatures: resetAggregatedFeatures,
  };
}
