import {reactive} from 'vue';

import {bandRef} from './useBands';
import {extractorRef} from './useExtractors';
import {integrationRef} from './useIntegrations';
import {storageFileRef} from './useStorageFile';
import {workerRef} from './useWorker';

export type AggregatedTimestamps = number[];

interface AggregatedTimestampsRef {
  value: AggregatedTimestamps | null;
}

export const aggregatedTimestampsRef = reactive<AggregatedTimestampsRef>({
  value: null,
});

export function useAggregatedTimestamps() {
  const readAggregatedTimestamps = async () => {
    if (
      workerRef.value === null ||
      storageFileRef.value === null ||
      bandRef.value === null ||
      integrationRef.value === null ||
      extractorRef.value === null
    ) {
      return;
    }

    aggregatedTimestampsRef.value =
      await workerRef.value.readAggregatedTimestamps(
        storageFileRef.value,
        bandRef.value.name,
        integrationRef.value.seconds,
        extractorRef.value.index,
      );
  };

  return {
    readAggregatedTimestamps: readAggregatedTimestamps,
  };
}
