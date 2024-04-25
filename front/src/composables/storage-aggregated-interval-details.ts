import {useBandSelection} from 'src/composables/band-selection';
import {useExtractorSelection} from 'src/composables/extractor-selection';
import {useStorageReader} from 'src/composables/storage-reader';
import {integrationRef} from 'src/hooks/useIntegrations';
import {ref} from 'vue';

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
  const {extractor} = useExtractorSelection();

  const readAggregatedIntervalDetails = async () => {
    if (isLoaded) {
      return;
    }

    isLoaded = true;

    await read(async (worker, file) => {
      if (
        band.value === null ||
        integrationRef.value === null ||
        extractor.value === null
      ) {
        return;
      }

      aggregatedIntervalDetails.value =
        await worker.readAggregatedIntervalDetails(
          file,
          band.value.name,
          integrationRef.value.seconds,
          extractor.value.index,
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
