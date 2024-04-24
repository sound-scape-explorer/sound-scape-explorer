import {ref} from 'vue';

import {bandRef} from '../hooks/useBands';
import {extractorRef} from '../hooks/useExtractors';
import {integrationRef} from '../hooks/useIntegrations';
import {useStorageReader} from './storage-reader';

type AggregatedFeatures = number[][];
const aggregatedFeatures = ref<AggregatedFeatures | null>(null);
let isLoaded = false;

export function useStorageAggregatedFeatures() {
  const {read} = useStorageReader();

  const readAggregatedFeatures = async () => {
    if (isLoaded) {
      return;
    }

    isLoaded = true;

    await read(async (worker, file) => {
      if (
        bandRef.value === null ||
        integrationRef.value === null ||
        extractorRef.value === null
      ) {
        return;
      }

      aggregatedFeatures.value = await worker.readAggregatedFeatures(
        file,
        bandRef.value.name,
        integrationRef.value.seconds,
        extractorRef.value.index,
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
