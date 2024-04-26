import {useBandSelection} from 'src/composables/band-selection';
import {useSelectExtractor} from 'src/composables/extractor-selection';
import {useIntegrationSelection} from 'src/composables/integration-selection';
import {useReducerSelection} from 'src/composables/reducer-selection';
import {useStorageReader} from 'src/composables/storage-reader';
import {useStorageReady} from 'src/composables/storage-ready';
import {
  selectedTrajectoriesRef,
  type Trajectory,
} from 'src/hooks/storage-trajectories';
import {reactive} from 'vue';

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
  const {isReady} = useStorageReady();

  const readTraced = async () => {
    if (!isReady.value) {
      return;
    }

    const {band} = useBandSelection();
    const {integration} = useIntegrationSelection();
    const {extractor} = useSelectExtractor();
    const {reducer} = useReducerSelection();

    await read(async (worker, file) => {
      if (
        band.value === null ||
        integration.value === null ||
        extractor.value === null ||
        reducer.value === null ||
        selectedTrajectoriesRef.value === null
      ) {
        return;
      }

      const traceds: Traced[] = [];

      for (const sT of selectedTrajectoriesRef.value) {
        const [data, timestamps, relativeTimestamps] = await worker.readTraced(
          file,
          band.value.name,
          integration.value.seconds,
          extractor.value.index,
          reducer.value.index,
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
  };

  return {
    readTraced: readTraced,
  };
}
