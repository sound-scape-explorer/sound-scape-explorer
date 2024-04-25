import {ref} from 'vue';

import {extractorRef} from '../hooks/useExtractors';
import {integrationRef} from '../hooks/useIntegrations';
import {useBandSelection} from './band-selection';
import {useStorageReader} from './storage-reader';

// INFO: A block corresponds to one audio
export interface BlockDetails {
  start: number;
  fileStart: number;
  file: string;
}

// INFO: An interval can have multiple blocks thus multiple audio files (portions of them)
export type IntervalDetails = BlockDetails[];

const aggregatedIntervalDetails = ref<IntervalDetails[] | null>(null);
let isLoaded = false;

export function useStorageAggregatedIntervalDetails() {
  const {read} = useStorageReader();
  const {band} = useBandSelection();

  const readAggregatedIntervalDetails = async () => {
    if (isLoaded) {
      return;
    }

    isLoaded = true;

    await read(async (worker, file) => {
      if (
        band.value === null ||
        integrationRef.value === null ||
        extractorRef.value === null
      ) {
        return;
      }

      aggregatedIntervalDetails.value =
        await worker.readAggregatedIntervalDetails(
          file,
          band.value.name,
          integrationRef.value.seconds,
          extractorRef.value.index,
        );
    });
  };

  const resetAggregatedIntervalDetails = () => {
    aggregatedIntervalDetails.value = null;
    isLoaded = false;
  };

  return {
    aggregatedIntervalDetails: aggregatedIntervalDetails,
    readAggregatedIntervalDetails: readAggregatedIntervalDetails,
    resetAggregatedIntervalDetails: resetAggregatedIntervalDetails,
  };
}