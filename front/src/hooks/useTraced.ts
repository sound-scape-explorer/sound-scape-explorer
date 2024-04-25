import {useStorageReader} from 'src/composables/storage-reader';
import {reactive} from 'vue';

import {useBandSelection} from '../composables/band-selection';
import {useExtractorSelection} from '../composables/extractor-selection';
import {integrationRef} from './useIntegrations';
import {reducerRef} from './useReducers';
import {selectedTrajectoriesRef, type Trajectory} from './useTrajectories';

export type TracedData = number[][];
export type TracedTimestamps = number[];
export type TracedRelativeTimestamps = number[];

export interface Traced {
  trajectory: Trajectory;
  data: TracedData;
  timestamps: TracedTimestamps;
  relativeTimestamps: TracedRelativeTimestamps;
}

export interface TracedRef {
  value: Traced[];
}

export const tracedRef = reactive<TracedRef>({
  value: [],
});

interface TracedFusedRef {
  value: boolean;
}

export const tracedFusedRef = reactive<TracedFusedRef>({
  value: false,
});

export function useTraced() {
  const {read} = useStorageReader();
  const {band} = useBandSelection();
  const {extractor} = useExtractorSelection();

  const readTraced = () =>
    read(async (worker, file) => {
      if (
        band.value === null ||
        integrationRef.value === null ||
        extractor.value === null ||
        reducerRef.value === null ||
        selectedTrajectoriesRef.value === null
      ) {
        return;
      }

      const traceds: Traced[] = [];

      for (const sT of selectedTrajectoriesRef.value) {
        const [data, timestamps, relativeTimestamps] = await worker.readTraced(
          file,
          band.value.name,
          integrationRef.value.seconds,
          extractor.value.index,
          reducerRef.value.index,
          sT.index,
        );

        const traced: Traced = {
          trajectory: sT,
          data: data,
          timestamps: timestamps,
          relativeTimestamps: relativeTimestamps,
        };

        traceds.push(traced);
      }

      tracedRef.value = traceds;
    });

  return {
    readTraced: readTraced,
  };
}
