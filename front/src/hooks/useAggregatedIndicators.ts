import {reactive} from 'vue';

import {bandRef} from './useBands';
import {type Extractor, nonNnExtractorsRef} from './useExtractors';
import {integrationRef} from './useIntegrations';
import {storageFileRef} from './useStorageFile';
import {workerRef} from './useWorker';

export interface AggregatedIndicator {
  extractor: Extractor;
  values: number[][];
}

interface AggregatedIndicatorsRef {
  value: AggregatedIndicator[] | null;
}

export const aggregatedIndicatorsRef = reactive<AggregatedIndicatorsRef>({
  value: null,
});

export function useAggregatedIndicators() {
  const readAggregatedIndicators = async () => {
    if (
      workerRef.value === null ||
      storageFileRef.value === null ||
      bandRef.value === null ||
      integrationRef.value === null ||
      nonNnExtractorsRef.value === null
    ) {
      return;
    }

    const extractorsIndexes = nonNnExtractorsRef.value.map((ex) => ex.index);

    const aggregated = await workerRef.value.readAggregatedIndicators(
      storageFileRef.value,
      bandRef.value.name,
      integrationRef.value.seconds,
      extractorsIndexes,
    );

    aggregatedIndicatorsRef.value = aggregated;
  };

  const resetAggregatedIndicators = () => {
    aggregatedIndicatorsRef.value = null;
  };

  return {
    readAggregatedIndicators: readAggregatedIndicators,
    resetAggregatedIndicators: resetAggregatedIndicators,
  };
}
