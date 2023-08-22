import {reactive, watchEffect} from 'vue';

import {bandRef} from './useBands';
import {extractorRef} from './useExtractors';
import {integrationRef} from './useIntegrations';
import {storageFileRef} from './useStorageFile';
import {workerRef} from './useWorker';

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
  const readAggregatedBlocksDetails = async () => {
    if (
      workerRef.value === null ||
      storageFileRef.value === null ||
      bandRef.value === null ||
      integrationRef.value === null ||
      extractorRef.value === null
    ) {
      return;
    }

    aggregatedIntervalDetailsRef.value =
      await workerRef.value.readAggregatedIntervalDetails(
        storageFileRef.value,
        bandRef.value.name,
        integrationRef.value.seconds,
        extractorRef.value.index,
      );
  };

  watchEffect(readAggregatedBlocksDetails);
}
