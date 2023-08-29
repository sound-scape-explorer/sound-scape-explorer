import {reactive, watchEffect} from 'vue';

import {bandRef} from './useBands';
import {extractorRef} from './useExtractors';
import {integrationRef} from './useIntegrations';
import {storageFileRef} from './useStorageFile';
import {workerRef} from './useWorker';

interface AggregatedFeaturesRef {
  value: number[][] | null;
}

export const aggregatedFeaturesRef = reactive<AggregatedFeaturesRef>({
  value: null,
});

export function useAggregatedFeatures() {
  const readAggregatedFeatures = async () => {
    if (
      workerRef.value === null ||
      storageFileRef.value === null ||
      bandRef.value === null ||
      integrationRef.value === null ||
      extractorRef.value === null
    ) {
      return;
    }

    aggregatedFeaturesRef.value = await workerRef.value.readAggregatedFeatures(
      storageFileRef.value,
      bandRef.value.name,
      integrationRef.value.seconds,
      extractorRef.value.index,
    );
  };

  watchEffect(readAggregatedFeatures);
}
