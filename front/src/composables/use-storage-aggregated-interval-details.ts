import {useBandSelection} from 'src/composables/use-band-selection';
import {useExtractorSelection} from 'src/composables/use-extractor-selection';
import {useIntegrationSelection} from 'src/composables/use-integration-selection';
import {useStorageReader} from 'src/composables/use-storage-reader';
import {useStorageReady} from 'src/composables/use-storage-ready';
import {ref} from 'vue';

// INFO: A block corresponds to one audio
export interface BlockDetails {
  start: number;
  fileStart: number;
  file: string;
  fileIndex: number;
}

// INFO: An interval can have multiple blocks thus multiple audio files (portions of them)
export type IntervalDetails = BlockDetails[];

const aggregatedIntervalDetails = ref<IntervalDetails[] | null>(null);
let isLoaded = false;

export function useStorageAggregatedIntervalDetails() {
  const {read} = useStorageReader();
  const {isReady} = useStorageReady();

  const readAggregatedIntervalDetails = async () => {
    if (!isReady.value) {
      return;
    }

    if (isLoaded) {
      return;
    }

    isLoaded = true;

    await read(async (worker, file) => {
      const {band} = useBandSelection();
      const {integration} = useIntegrationSelection();
      const {extractor} = useExtractorSelection();

      if (
        band.value === null ||
        integration.value === null ||
        extractor.value === null
      ) {
        return;
      }

      aggregatedIntervalDetails.value =
        await worker.readAggregatedIntervalDetails(
          file,
          band.value.name,
          integration.value.seconds,
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
