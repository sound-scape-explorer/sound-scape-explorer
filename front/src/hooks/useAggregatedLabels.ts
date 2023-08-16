import {reactive, watchEffect} from 'vue';

import {bandRef} from './useBands';
import {extractorRef} from './useExtractors';
import {integrationRef} from './useIntegrations';
import {storageFileRef} from './useStorageFile';
import {workerRef} from './useWorker';

interface AggregatedLabelsRef {
  value: string[][] | null;
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

  watchEffect(readAggregatedLabels);
}
