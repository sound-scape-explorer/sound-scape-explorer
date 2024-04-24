import {reactive} from 'vue';

import {useStorageReader} from '../composables/storage-reader';
import {bandRef} from './useBands';
import {extractorRef} from './useExtractors';
import {integrationRef} from './useIntegrations';
import {reducerRef} from './useReducers';

export type ReducedFeatures = number[][];

interface ReducedFeaturesRef {
  value: ReducedFeatures | null;
}

export const reducedFeaturesRef = reactive<ReducedFeaturesRef>({
  value: null,
});

export function useReducedFeatures() {
  const {read} = useStorageReader();

  const readReducedFeatures = () =>
    read(async (worker, file) => {
      if (
        bandRef.value === null ||
        integrationRef.value === null ||
        extractorRef.value === null ||
        reducerRef.value === null
      ) {
        return;
      }

      reducedFeaturesRef.value = await worker.readReducedFeatures(
        file,
        bandRef.value.name,
        integrationRef.value.seconds,
        extractorRef.value.index,
        reducerRef.value.index,
      );
    });

  const resetReducedFeatures = () => {
    reducedFeaturesRef.value = null;
  };

  return {
    readReducedFeatures: readReducedFeatures,
    resetReducedFeatures: resetReducedFeatures,
  };
}
