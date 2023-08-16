import {reactive, watchEffect} from 'vue';

import {bandRef} from './useBands';
import {extractorRef} from './useExtractors';
import {integrationRef} from './useIntegrations';
import {storageFileRef} from './useStorageFile';
import {workerRef} from './useWorker';

interface GroupedFeaturesRef {
  value: number[][] | null;
}

export const groupedFeaturesRef = reactive<GroupedFeaturesRef>({
  value: null,
});

export function useStorageGroupedFeatures() {
  const readGroupedFeatures = async () => {
    if (
      workerRef.value === null ||
      storageFileRef.value === null ||
      bandRef.value === null ||
      integrationRef.value === null ||
      extractorRef.value === null
    ) {
      return;
    }

    groupedFeaturesRef.value = await workerRef.value.readAggregated(
      storageFileRef.value,
      bandRef.value.name,
      integrationRef.value.seconds,
      extractorRef.value.index,
    );
  };

  watchEffect(readGroupedFeatures);
}
