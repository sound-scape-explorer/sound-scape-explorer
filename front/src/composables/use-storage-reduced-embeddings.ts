import {useStorageReader} from 'src/composables/use-storage-reader';
import {useStorageReady} from 'src/composables/use-storage-ready';
import {useViewSelectionNew} from 'src/composables/use-view-selection-new';
import {ref} from 'vue';

export type ReducedEmbeddings = number[][];
const reducedEmbeddings = ref<ReducedEmbeddings | null>(null);
let isLoaded = false;

export function useStorageReducedEmbeddings() {
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
      const {extraction, band, integration, reducer} = useViewSelectionNew();

      if (
        extraction.value === null ||
        band.value === null ||
        integration.value === null ||
        reducer.value === null
      ) {
        return;
      }

      reducedEmbeddings.value = await worker.readReductions(
        file,
        extraction.value.index,
        reducer.value.index,
        band.value.index,
        integration.value.index,
      );
    });
  };

  const resetReducedFeatures = () => {
    reducedEmbeddings.value = null;
    isLoaded = false;
  };

  return {
    reducedEmbeddings,
    readReducedEmbeddings: readReducedFeatures,
    resetReducedEmbeddings: resetReducedFeatures,
  };
}
