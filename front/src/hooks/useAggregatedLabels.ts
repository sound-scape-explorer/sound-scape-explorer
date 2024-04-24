import {reactive} from 'vue';

import {useStorageReader} from '../composables/storage-reader';
import {bandRef} from './useBands';
import {extractorRef} from './useExtractors';
import {integrationRef} from './useIntegrations';

export type AggregatedLabels = string[][];

interface AggregatedLabelsRef {
  value: AggregatedLabels | null;
}

export const aggregatedLabelsRef = reactive<AggregatedLabelsRef>({
  value: null,
});

export function useAggregatedLabels() {
  const {read} = useStorageReader();

  const readAggregatedLabels = () =>
    read(async (worker, file) => {
      if (
        bandRef.value === null ||
        integrationRef.value === null ||
        extractorRef.value === null
      ) {
        return;
      }

      aggregatedLabelsRef.value = await worker.readAggregatedLabels(
        file,
        bandRef.value.name,
        integrationRef.value.seconds,
        extractorRef.value.index,
      );
    });

  const resetAggregatedLabels = () => {
    aggregatedLabelsRef.value = null;
  };

  return {
    readAggregatedLabels: readAggregatedLabels,
    resetAggregatedLabels: resetAggregatedLabels,
  };
}
