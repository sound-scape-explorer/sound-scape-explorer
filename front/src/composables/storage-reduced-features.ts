import {useBandSelection} from 'src/composables/band-selection';
import {useExtractorSelection} from 'src/composables/extractor-selection';
import {useStorageReader} from 'src/composables/storage-reader';
import {integrationRef} from 'src/hooks/useIntegrations';
import {reducerRef} from 'src/hooks/useReducers';
import {ref} from 'vue';

export type ReducedFeatures = number[][];
const reducedFeatures = ref<ReducedFeatures | null>(null);
let isLoaded = false;

export function useStorageReducedFeatures() {
  const {read} = useStorageReader();
  const {band} = useBandSelection();
  const {extractor} = useExtractorSelection();

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
        extractor.value === null ||
        reducerRef.value === null
      ) {
        return;
      }

      reducedFeatures.value = await worker.readReducedFeatures(
        file,
        band.value.name,
        integrationRef.value.seconds,
        extractor.value.index,
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
