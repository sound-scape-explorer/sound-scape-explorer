import {reactive} from 'vue';

import {bandRef} from './useBands';
import {extractorRef} from './useExtractors';
import {integrationRef} from './useIntegrations';
import {useWorker} from './useWorker';

// INFO: A block corresponds to one audio
export interface BlockDetails {
  start: number;
  fileStart: number;
  file: string;
}

// INFO: An interval can have multiple blocks thus multiple audio files (portions of them)
export type IntervalDetails = BlockDetails[];

interface AggregatedIntervalDetailsRef {
  value: IntervalDetails[] | null;
}

export const aggregatedIntervalDetailsRef =
  reactive<AggregatedIntervalDetailsRef>({
    value: null,
  });

export function useAggregatedIntervalDetails() {
  const {read} = useWorker();

  const readAggregatedIntervalDetails = () =>
    read(async (worker, storage) => {
      if (
        bandRef.value === null ||
        integrationRef.value === null ||
        extractorRef.value === null
      ) {
        return;
      }

      aggregatedIntervalDetailsRef.value =
        await worker.readAggregatedIntervalDetails(
          storage,
          bandRef.value.name,
          integrationRef.value.seconds,
          extractorRef.value.index,
        );
    });

  const resetAggregatedIntervalDetails = () => {
    aggregatedIntervalDetailsRef.value = null;
  };

  return {
    readAggregatedIntervalDetails: readAggregatedIntervalDetails,
    resetAggregatedIntervalDetails: resetAggregatedIntervalDetails,
  };
}
