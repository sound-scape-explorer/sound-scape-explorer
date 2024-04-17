import {reactive} from 'vue';

import {bandRef} from './useBands';
import {type Extractor, nonNnExtractorsRef} from './useExtractors';
import {integrationRef} from './useIntegrations';
import {useWorker} from './useWorker';

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
  const {read} = useWorker();

  const readAggregatedIndicators = () =>
    read(async (worker, storage) => {
      if (
        bandRef.value === null ||
        integrationRef.value === null ||
        nonNnExtractorsRef.value === null
      ) {
        return;
      }

      const extractorsIndexes = nonNnExtractorsRef.value.map((ex) => ex.index);

      const aggregated = await worker.readAggregatedIndicators(
        storage,
        bandRef.value.name,
        integrationRef.value.seconds,
        extractorsIndexes,
      );

      aggregatedIndicatorsRef.value = aggregated;
    });

  const resetAggregatedIndicators = () => {
    aggregatedIndicatorsRef.value = null;
  };

  return {
    readAggregatedIndicators: readAggregatedIndicators,
    resetAggregatedIndicators: resetAggregatedIndicators,
  };
}
