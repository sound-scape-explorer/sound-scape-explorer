import {reactive} from 'vue';

import {bandRef} from './useBands';
import {extractorRef} from './useExtractors';
import {integrationRef} from './useIntegrations';
import {useWorker} from './useWorker';

export type AggregatedTimestamps = number[];

interface AggregatedTimestampsRef {
  value: AggregatedTimestamps | null;
}

export const aggregatedTimestampsRef = reactive<AggregatedTimestampsRef>({
  value: null,
});

export function useAggregatedTimestamps() {
  const {read} = useWorker();

  const readAggregatedTimestamps = () =>
    read(async (worker, storage) => {
      if (
        bandRef.value === null ||
        integrationRef.value === null ||
        extractorRef.value === null
      ) {
        return;
      }

      aggregatedTimestampsRef.value = await worker.readAggregatedTimestamps(
        storage,
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
