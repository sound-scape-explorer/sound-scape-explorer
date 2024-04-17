import {reactive} from 'vue';

import {bandRef} from './useBands';
import {extractorRef} from './useExtractors';
import {integrationRef} from './useIntegrations';
import {useWorker} from './useWorker';

export type AggregatedLabels = string[][];

interface AggregatedLabelsRef {
  value: AggregatedLabels | null;
}

export const aggregatedLabelsRef = reactive<AggregatedLabelsRef>({
  value: null,
});

export function useAggregatedLabels() {
  const {read} = useWorker();

  const readAggregatedLabels = () =>
    read(async (worker, storage) => {
      if (
        bandRef.value === null ||
        integrationRef.value === null ||
        extractorRef.value === null
      ) {
        return;
      }

      aggregatedLabelsRef.value = await worker.readAggregatedLabels(
        storage,
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
