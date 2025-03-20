import {StorageAggregatedLabelsErrors} from 'src/common/Errors';
import {useBandSelection} from 'src/composables/use-band-selection';
import {useExtractorSelection} from 'src/composables/use-extractor-selection';
import {useIntegrationSelection} from 'src/composables/use-integration-selection';
import {useStorageAggregatedSites} from 'src/composables/use-storage-aggregated-sites';
import {useStorageReader} from 'src/composables/use-storage-reader';
import {useStorageReady} from 'src/composables/use-storage-ready';
import {ref} from 'vue';

export type AggregatedLabels = string[][];

const aggregatedLabels = ref<AggregatedLabels | null>(null);
let isLoaded = false;

export function useStorageAggregatedLabels() {
  const {read} = useStorageReader();
  const {isReady} = useStorageReady();
  const {aggregatedSites} = useStorageAggregatedSites();

  const readAggregatedLabels = async () => {
    if (!isReady.value) {
      return;
    }

    if (isLoaded) {
      return;
    }

    const sites = aggregatedSites.value;
    if (sites === null) {
      throw new StorageAggregatedLabelsErrors('aggregated sites not available');
    }

    isLoaded = true;

    await read(async (worker, file) => {
      const {band} = useBandSelection();
      const {integration} = useIntegrationSelection();
      const {extractor} = useExtractorSelection();

      if (
        band.value === null ||
        integration.value === null ||
        extractor.value === null
      ) {
        return;
      }

      const newLabels = await worker.readAggregatedLabels(
        file,
        band.value.index,
        integration.value.index,
        extractor.value.index,
      );

      // mutate labels to embed sites at first position
      const l = newLabels.length;
      for (let i = 0; i < l; i += 1) {
        const labels = newLabels[i];
        const site = sites[i];
        labels.unshift(site);
      }

      aggregatedLabels.value = newLabels;
    });
  };

  const resetAggregatedLabels = () => {
    aggregatedLabels.value = null;
    isLoaded = false;
  };

  return {
    aggregatedLabels: aggregatedLabels,
    readAggregatedLabels: readAggregatedLabels,
    resetAggregatedLabels: resetAggregatedLabels,
  };
}
