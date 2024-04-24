import {reactive} from 'vue';

import {useStorageReader} from '../composables/storage-reader';
import {bandRef} from './useBands';
import {extractorRef} from './useExtractors';
import {integrationRef} from './useIntegrations';

export type AggregatedTimestamps = number[];

interface AggregatedTimestampsRef {
  value: AggregatedTimestamps | null;
}

export const aggregatedTimestampsRef = reactive<AggregatedTimestampsRef>({
  value: null,
});

export function useAggregatedTimestamps() {
  const {read} = useStorageReader();

  const readAggregatedTimestamps = () =>
    read(async (worker, file) => {
      if (
        bandRef.value === null ||
        integrationRef.value === null ||
        extractorRef.value === null
      ) {
        return;
      }

      aggregatedTimestampsRef.value = await worker.readAggregatedTimestamps(
        file,
        bandRef.value.name,
        integrationRef.value.seconds,
        extractorRef.value.index,
      );
    });

  const resetAggregatedTimestamps = () => {
    aggregatedTimestampsRef.value = null;
  };

  return {
    readAggregatedTimestamps: readAggregatedTimestamps,
    resetAggregatedTimestamps: resetAggregatedTimestamps,
  };
}
