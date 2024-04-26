import {useBandSelection} from 'src/composables/band-selection';
import {useSelectExtractor} from 'src/composables/extractor-selection';
import {useIntegrationSelection} from 'src/composables/integration-selection';
import {useReducerSelection} from 'src/composables/reducer-selection';
import {useStorageReader} from 'src/composables/storage-reader';
import {useStorageReady} from 'src/composables/storage-ready';
import {ref} from 'vue';

export type ReducedFeatures = number[][];
const reducedFeatures = ref<ReducedFeatures | null>(null);
let isLoaded = false;

export function useStorageReducedFeatures() {
  const {read} = useStorageReader();
  const {isReady} = useStorageReady();

  // TODO: why is this called two times at runtime???
  const readReducedFeatures = async () => {
    if (!isReady.value) {
      return;
    }

    if (isLoaded) {
      return;
    }

    isLoaded = true;

    await read(async (worker, file) => {
      const {band} = useBandSelection();
      const {integration} = useIntegrationSelection();
      const {extractor} = useSelectExtractor();
      const {reducer} = useReducerSelection();

      if (
        band.value === null ||
        integration.value === null ||
        extractor.value === null ||
        reducer.value === null
      ) {
        return;
      }

      reducedFeatures.value = await worker.readReducedFeatures(
        file,
        band.value.name,
        integration.value.seconds,
        extractor.value.index,
        reducer.value.index,
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
