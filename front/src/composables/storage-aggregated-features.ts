import {ref} from 'vue';

import {integrationRef} from '../hooks/useIntegrations';
import {useBandSelection} from './band-selection';
import {useExtractorSelection} from './extractor-selection';
import {useStorageReader} from './storage-reader';

type AggregatedFeatures = number[][];
const aggregatedFeatures = ref<AggregatedFeatures | null>(null);
let isLoaded = false;

export function useStorageAggregatedFeatures() {
  const {read} = useStorageReader();
  const {band} = useBandSelection();
  const {extractor} = useExtractorSelection();

  const readAggregatedFeatures = async () => {
    if (isLoaded) {
      return;
    }

    isLoaded = true;

    await read(async (worker, file) => {
      if (
        band.value === null ||
        integrationRef.value === null ||
        extractor.value === null
      ) {
        return;
      }

      aggregatedFeatures.value = await worker.readAggregatedFeatures(
        file,
        band.value.name,
        integrationRef.value.seconds,
        extractor.value.index,
      );
    });
  };

  const resetAggregatedFeatures = () => {
    aggregatedFeatures.value = null;
    isLoaded = false;
  };

  return {
    aggregatedFeatures: aggregatedFeatures,
    readAggregatedFeatures: readAggregatedFeatures,
    resetAggregatedFeatures: resetAggregatedFeatures,
  };
}
