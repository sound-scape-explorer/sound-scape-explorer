import {useStorageReader} from 'src/composables/use-storage-reader';
import {useStorageReady} from 'src/composables/use-storage-ready';
import {useViewSelection} from 'src/composables/use-view-selection';
import {ref} from 'vue';

export type Reductions = number[][];
const reductions = ref<Reductions | null>(null);
let isLoaded = false;

export function useReductions() {
  const {read: r} = useStorageReader();
  const {isReady} = useStorageReady();

  const read = async () => {
    if (!isReady.value) {
      return;
    }

    if (isLoaded) {
      return;
    }

    isLoaded = true;

    await r(async (worker, file) => {
      const {extraction, band, integration, reducer} = useViewSelection();

      if (
        extraction.value === null ||
        band.value === null ||
        integration.value === null ||
        reducer.value === null
      ) {
        return;
      }

      reductions.value = await worker.readReductions(
        file,
        extraction.value.index,
        reducer.value.index,
        band.value.index,
        integration.value.index,
      );
    });
  };

  const reset = () => {
    reductions.value = null;
    isLoaded = false;
  };

  return {
    reductions,
    read,
    reset,
  };
}
