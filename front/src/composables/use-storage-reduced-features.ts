import {useBandSelection} from 'src/composables/use-band-selection';
import {useSelectExtractor} from 'src/composables/use-extractor-selection';
import {useIntegrationSelection} from 'src/composables/use-integration-selection';
import {useReducerSelection} from 'src/composables/use-reducer-selection';
import {useStorageReader} from 'src/composables/use-storage-reader';
import {useStorageReady} from 'src/composables/use-storage-ready';
import {ref} from 'vue';

export type ReducedFeatures = number[][];
const reducedFeatures = ref<ReducedFeatures | null>(null);
let isLoaded = false;

export function useStorageReducedFeatures() {
  const {read} = useStorageReader();
  const {isReady} = useStorageReady();

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
