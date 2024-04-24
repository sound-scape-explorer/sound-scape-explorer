import {ref} from 'vue';

import {bandRef} from '../hooks/useBands';
import {extractorRef} from '../hooks/useExtractors';
import {integrationRef} from '../hooks/useIntegrations';
import {reducerRef} from '../hooks/useReducers';
import {useStorageReader} from './storage-reader';

export type ReducedFeatures = number[][];
const reducedFeatures = ref<ReducedFeatures | null>(null);
let isLoaded = false;

export function useStorageReducedFeatures() {
  const {read} = useStorageReader();

  // TODO: why is this called two times at runtime???
  const readReducedFeatures = async () => {
    if (isLoaded) {
      return;
    }
    console.log('READ');

    isLoaded = false;

    await read(async (worker, file) => {
      if (
        bandRef.value === null ||
        integrationRef.value === null ||
        extractorRef.value === null ||
        reducerRef.value === null
      ) {
        return;
      }

      reducedFeatures.value = await worker.readReducedFeatures(
        file,
        bandRef.value.name,
        integrationRef.value.seconds,
        extractorRef.value.index,
        reducerRef.value.index,
      );
    });
  };

  const resetReducedFeatures = () => {
    reducedFeatures.value = null;
    isLoaded = false;
  };

  return {
    reducedFeatures: reducedFeatures,
    readReducedFeatures: readReducedFeatures,
    resetReducedFeatures: resetReducedFeatures,
  };
}
