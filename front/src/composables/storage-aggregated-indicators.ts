import {ref} from 'vue';

import {integrationRef} from '../hooks/useIntegrations';
import {useBandSelection} from './band-selection';
import {type Extractor, useStorageExtractors} from './storage-extractors';
import {useStorageReader} from './storage-reader';

export interface AggregatedIndicator {
  extractor: Extractor;
  values: number[][];
}

const aggregatedIndicators = ref<AggregatedIndicator[] | null>(null);
let isLoaded = false;

export function useStorageAggregatedIndicators() {
  const {read} = useStorageReader();
  const {band} = useBandSelection();
  const {nonNnExtractors} = useStorageExtractors();

  const readAggregatedIndicators = async () => {
    if (isLoaded) {
      return;
    }

    isLoaded = true;

    await read(async (worker, file) => {
      if (
        band.value === null ||
        integrationRef.value === null ||
        nonNnExtractors.value === null
      ) {
        return;
      }

      const extractorsIndexes = nonNnExtractors.value.map((ex) => ex.index);

      const aggregated = await worker.readAggregatedIndicators(
        file,
        band.value.name,
        integrationRef.value.seconds,
        extractorsIndexes,
      );

      aggregatedIndicators.value = aggregated;
    });
  };

  const resetAggregatedIndicators = () => {
    aggregatedIndicators.value = null;
    isLoaded = false;
  };

  return {
    aggregatedIndicators: aggregatedIndicators,
    readAggregatedIndicators: readAggregatedIndicators,
    resetAggregatedIndicators: resetAggregatedIndicators,
  };
}
