import {reactive} from 'vue';

import {bandRef} from './useBands';
import {extractorRef} from './useExtractors';
import {integrationRef} from './useIntegrations';
import {storageFileRef} from './useStorageFile';
import {workerRef} from './useWorker';

export type AggregatedLabels = string[][];

interface AggregatedLabelsRef {
  value: AggregatedLabels | null;
}

export const aggregatedLabelsRef = reactive<AggregatedLabelsRef>({
  value: null,
});

export function useAggregatedLabels() {
  const readAggregatedLabels = async () => {
    if (
      workerRef.value === null ||
      storageFileRef.value === null ||
      bandRef.value === null ||
      integrationRef.value === null ||
      extractorRef.value === null
    ) {
      return;
    }

    aggregatedLabelsRef.value = await workerRef.value.readAggregatedLabels(
      storageFileRef.value,
      bandRef.value.name,
      integrationRef.value.seconds,
      extractorRef.value.index,
    );
  };

  const resetAggregatedLabels = () => {
    aggregatedLabelsRef.value = null;
  };

  return {
    readAggregatedLabels: readAggregatedLabels,
    resetAggregatedLabels: resetAggregatedLabels,
  };
}
