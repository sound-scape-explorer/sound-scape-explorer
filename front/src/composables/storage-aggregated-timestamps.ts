import {ref} from 'vue';

import {integrationRef} from '../hooks/useIntegrations';
import {useBandSelection} from './band-selection';
import {useExtractorSelection} from './extractor-selection';
import {useStorageReader} from './storage-reader';

export type AggregatedTimestamps = number[];

const aggregatedTimestamps = ref<AggregatedTimestamps | null>(null);
let isLoaded = false;

export function useStorageAggregatedTimestamps() {
  const {read} = useStorageReader();
  const {band} = useBandSelection();
  const {extractor} = useExtractorSelection();

  const readAggregatedTimestamps = async () => {
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

      aggregatedTimestamps.value = await worker.readAggregatedTimestamps(
        file,
        band.value.name,
        integrationRef.value.seconds,
        extractor.value.index,
      );
    });
  };

  const resetAggregatedTimestamps = () => {
    aggregatedTimestamps.value = null;
    isLoaded = false;
  };

  return {
    aggregatedTimestamps: aggregatedTimestamps,
    readAggregatedTimestamps: readAggregatedTimestamps,
    resetAggregatedTimestamps: resetAggregatedTimestamps,
  };
}
