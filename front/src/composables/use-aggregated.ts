import {useSitesNew} from 'src/composables/use-sites-new';
import {useStorageReader} from 'src/composables/use-storage-reader';
import {useViewSelectionNew} from 'src/composables/use-view-selection-new';
import {ref} from 'vue';

export interface Aggregated {
  embeddings: number[][];
  timestamps: number[];
  fileIndices: number[][];
  fileRelativeStarts: number[][];
  extractorIndices: number[][];
}

const aggregated = ref<Aggregated | null>(null);

export function useAggregated() {
  const {read: r} = useStorageReader();
  const {sites} = useSitesNew();
  const {extraction, band, integration} = useViewSelectionNew();

  const read = async () => {
    await r(async (worker, file) => {
      if (
        extraction.value === null ||
        band.value === null ||
        integration.value === null
      ) {
        return;
      }

      aggregated.value = await worker.readAggregations(
        file,
        extraction.value.index,
        band.value.index,
        integration.value.index,
        Object.keys(sites.value),
      );
    });
  };

  const reset = () => {
    aggregated.value = null;
  };

  return {
    aggregated,
    read,
    reset,
  };
}
