import {useBandSelection} from 'src/composables/band-selection';
import {useSelectExtractor} from 'src/composables/extractor-selection';
import {useIntegrationSelection} from 'src/composables/integration-selection';
import {useStorageReader} from 'src/composables/storage-reader';
import {ref} from 'vue';

export type AggregatedTimestamps = number[];

const aggregatedTimestamps = ref<AggregatedTimestamps | null>(null);
let isLoaded = false;

export function useStorageAggregatedTimestamps() {
  const {read} = useStorageReader();
  const {band} = useBandSelection();
  const {integration} = useIntegrationSelection();
  const {extractor} = useSelectExtractor();

  const readAggregatedTimestamps = async () => {
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
