import {reactive} from 'vue';

import {useStorageReader} from '../composables/storage-reader';
import {bandRef} from './useBands';
import {extractorRef} from './useExtractors';
import {integrationRef} from './useIntegrations';

interface AggregatedFeaturesRef {
  value: number[][] | null;
}

export const aggregatedFeaturesRef = reactive<AggregatedFeaturesRef>({
  value: null,
});

export function useAggregatedFeatures() {
  const {read} = useStorageReader();

  const readAggregatedFeatures = () =>
    read(async (worker, file) => {
      if (
        bandRef.value === null ||
        integrationRef.value === null ||
        extractorRef.value === null
      ) {
        return;
      }

      aggregatedFeaturesRef.value = await worker.readAggregatedFeatures(
        file,
        bandRef.value.name,
        integrationRef.value.seconds,
        extractorRef.value.index,
      );
    });

  const resetAggregatedFeatures = () => {
    aggregatedFeaturesRef.value = null;
  };

  return {
    readAggregatedFeatures: readAggregatedFeatures,
    resetAggregatedFeatures: resetAggregatedFeatures,
  };
}
