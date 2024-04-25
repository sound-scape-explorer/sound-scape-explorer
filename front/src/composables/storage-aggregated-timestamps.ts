import {useSelectBand} from 'src/composables/select-band';
import {useSelectExtractor} from 'src/composables/select-extractor';
import {useStorageReader} from 'src/composables/storage-reader';
import {integrationRef} from 'src/hooks/useIntegrations';
import {ref} from 'vue';

export type AggregatedTimestamps = number[];

const aggregatedTimestamps = ref<AggregatedTimestamps | null>(null);
let isLoaded = false;

export function useStorageAggregatedTimestamps() {
  const {read} = useStorageReader();
  const {band} = useSelectBand();
  const {extractor} = useSelectExtractor();

  const readAggregatedTimestamps = async () => {
    if (isLoaded) {
      return;
    }

    isLoaded = true;

    await read(async (worker, file) => {
      if (
        band.value === null ||
        integrationRef.value === null ||
        extractor.value === null
      ) {
        return;
      }

      aggregatedTimestamps.value = await worker.readAggregatedTimestamps(
        file,
        band.value.name,
        integrationRef.value.seconds,
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
