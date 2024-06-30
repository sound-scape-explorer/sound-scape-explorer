import {useBandSelection} from 'src/composables/use-band-selection';
import {useSelectExtractor} from 'src/composables/use-extractor-selection';
import {useIntegrationSelection} from 'src/composables/use-integration-selection';
import {useStorageReader} from 'src/composables/use-storage-reader';
import {useStorageReady} from 'src/composables/use-storage-ready';
import {ref} from 'vue';

export type AggregatedTimestamps = number[];

const aggregatedTimestamps = ref<AggregatedTimestamps | null>(null);
let isLoaded = false;

export function useStorageAggregatedTimestamps() {
  const {read} = useStorageReader();
  const {isReady} = useStorageReady();

  const readAggregatedTimestamps = async () => {
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

      aggregatedTimestamps.value = await worker.readAggregatedTimestamps(
        file,
        band.value.name,
        integration.value.seconds,
        extractor.value.index,
      );
    });
  };

  const resetAggregatedTimestamps = () => {
    aggregatedTimestamps.value = null;
    isLoaded = false;
  };

  return {
    aggregatedTimestamps: aggregatedTimestamps,
    readAggregatedTimestamps: readAggregatedTimestamps,
    resetAggregatedTimestamps: resetAggregatedTimestamps,
  };
}
