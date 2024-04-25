import {ref} from 'vue';

import {extractorRef} from '../hooks/useExtractors';
import {integrationRef} from '../hooks/useIntegrations';
import {reducerRef} from '../hooks/useReducers';
import {useBandSelection} from './band-selection';
import {useStorageReader} from './storage-reader';

export type ReducedFeatures = number[][];
const reducedFeatures = ref<ReducedFeatures | null>(null);
let isLoaded = false;

export function useStorageReducedFeatures() {
  const {read} = useStorageReader();
  const {band} = useBandSelection();

  // TODO: why is this called two times at runtime???
  const readReducedFeatures = async () => {
    if (isLoaded) {
      return;
    }

    isLoaded = false;

    await read(async (worker, file) => {
      if (
        band.value === null ||
        integrationRef.value === null ||
        extractorRef.value === null ||
        reducerRef.value === null
      ) {
        return;
      }

      reducedFeatures.value = await worker.readReducedFeatures(
        file,
        band.value.name,
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
