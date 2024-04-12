import {reactive} from 'vue';

import {bandRef} from './useBands';
import {extractorRef} from './useExtractors';
import {integrationRef} from './useIntegrations';
import {useWorker} from './useWorker';

interface AggregatedFeaturesRef {
  value: number[][] | null;
}

export const aggregatedFeaturesRef = reactive<AggregatedFeaturesRef>({
  value: null,
});

export function useAggregatedFeatures() {
  const {read} = useWorker();

  const readAggregatedFeatures = () =>
    read(async (worker, storage) => {
      if (
        bandRef.value === null ||
        integrationRef.value === null ||
        extractorRef.value === null
      ) {
        return;
      }

      aggregatedFeaturesRef.value = await worker.readAggregatedFeatures(
        storage,
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
