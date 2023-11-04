import {reactive} from 'vue';

import {bandRef} from './useBands';
import {extractorRef} from './useExtractors';
import {integrationRef} from './useIntegrations';
import {reducerRef} from './useReducers';
import {storageFileRef} from './useStorageFile';
import {workerRef} from './useWorker';

export type ReducedFeatures = number[][];

interface ReducedFeaturesRef {
  value: ReducedFeatures | null;
}

export const reducedFeaturesRef = reactive<ReducedFeaturesRef>({
  value: null,
});

export function useReducedFeatures() {
  const readReducedFeatures = async () => {
    if (
      workerRef.value === null ||
      storageFileRef.value === null ||
      bandRef.value === null ||
      integrationRef.value === null ||
      extractorRef.value === null ||
      reducerRef.value === null
    ) {
      return;
    }

    reducedFeaturesRef.value = await workerRef.value.readReducedFeatures(
      storageFileRef.value,
      bandRef.value.name,
      integrationRef.value.seconds,
      extractorRef.value.index,
      reducerRef.value.index,
    );
  };

  const resetReducedFeatures = () => {
    reducedFeaturesRef.value = null;
  };

  return {
    readReducedFeatures: readReducedFeatures,
    resetReducedFeatures: resetReducedFeatures,
  };
}
