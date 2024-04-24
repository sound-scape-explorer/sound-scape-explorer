import {reactive} from 'vue';

import {useFileReader} from './file-reader';
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
  const {read} = useFileReader();

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
