import {useSitesNew} from 'src/composables/use-sites-new';
import {useStorageReader} from 'src/composables/use-storage-reader';
import {useViewSelection} from 'src/composables/use-view-selection';
import {ref} from 'vue';

export interface Aggregations {
  embeddings: number[][];
  timestamps: number[];
  fileIndices: number[][];
  fileRelativeStarts: number[][];
  extractorIndices: number[][];
}

const aggregations = ref<Aggregations | null>(null);

export function useAggregations() {
  const {read: r} = useStorageReader();
  const {sites} = useSitesNew();
  const {extraction, band, integration} = useViewSelection();

  const read = async () => {
    await r(async (worker, file) => {
      if (
        extraction.value === null ||
        band.value === null ||
        integration.value === null
      ) {
        return;
      }

      aggregations.value = await worker.readAggregations(
        file,
        extraction.value.index,
        band.value.index,
        integration.value.index,
        Object.keys(sites.value),
      );
    });
  };

  const reset = () => {
    aggregations.value = null;
  };

  return {
    aggregations,
    read,
    reset,
  };
}
