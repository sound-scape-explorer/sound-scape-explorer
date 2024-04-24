import {ref} from 'vue';

import {bandRef} from '../hooks/useBands';
import {extractorRef} from '../hooks/useExtractors';
import {integrationRef} from '../hooks/useIntegrations';
import {useStorageReader} from './storage-reader';

export type AggregatedLabels = string[][];

const aggregatedLabels = ref<AggregatedLabels | null>(null);
let isLoaded = false;

export function useStorageAggregatedLabels() {
  const {read} = useStorageReader();

  const readAggregatedLabels = async () => {
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

      aggregatedLabels.value = await worker.readAggregatedLabels(
        file,
        bandRef.value.name,
        integrationRef.value.seconds,
        extractorRef.value.index,
      );
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
