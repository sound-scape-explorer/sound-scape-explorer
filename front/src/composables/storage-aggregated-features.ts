import {useSelectBand} from 'src/composables/select-band';
import {useSelectExtractor} from 'src/composables/select-extractor';
import {useStorageReader} from 'src/composables/storage-reader';
import {integrationRef} from 'src/hooks/useIntegrations';
import {ref} from 'vue';

type AggregatedFeatures = number[][];
const aggregatedFeatures = ref<AggregatedFeatures | null>(null);
let isLoaded = false;

export function useStorageAggregatedFeatures() {
  const {read} = useStorageReader();
  const {band} = useSelectBand();
  const {extractor} = useSelectExtractor();

  const readAggregatedFeatures = async () => {
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

      aggregatedFeatures.value = await worker.readAggregatedFeatures(
        file,
        band.value.name,
        integrationRef.value.seconds,
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
