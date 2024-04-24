import {ref} from 'vue';

import {bandRef} from '../hooks/useBands';
import {type Extractor, nonNnExtractorsRef} from '../hooks/useExtractors';
import {integrationRef} from '../hooks/useIntegrations';
import {useStorageReader} from './storage-reader';

export interface AggregatedIndicator {
  extractor: Extractor;
  values: number[][];
}

const aggregatedIndicators = ref<AggregatedIndicator[] | null>(null);
let isLoaded = false;

export function useStorageAggregatedIndicators() {
  const {read} = useStorageReader();

  const readAggregatedIndicators = async () => {
    if (isLoaded) {
      return;
    }

    isLoaded = true;

    await read(async (worker, file) => {
      if (
        bandRef.value === null ||
        integrationRef.value === null ||
        nonNnExtractorsRef.value === null
      ) {
        return;
      }

      const extractorsIndexes = nonNnExtractorsRef.value.map((ex) => ex.index);

      const aggregated = await worker.readAggregatedIndicators(
        file,
        bandRef.value.name,
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
