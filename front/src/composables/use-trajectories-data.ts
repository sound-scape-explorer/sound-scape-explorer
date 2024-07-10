import {useBandSelection} from 'src/composables/use-band-selection';
import {useSelectExtractor} from 'src/composables/use-extractor-selection';
import {useIntegrationSelection} from 'src/composables/use-integration-selection';
import {useReducerSelection} from 'src/composables/use-reducer-selection';
import {useStorageReader} from 'src/composables/use-storage-reader';
import {useStorageReady} from 'src/composables/use-storage-ready';
import {useTrajectoriesSelection} from 'src/composables/use-trajectories-selection';
import {type Trajectory} from 'src/composables/use-trajectories-storage';
import {ref} from 'vue';

export type TracedData = number[][];
export type TracedTimestamps = number[];
export type TracedRelativeTimestamps = number[];

// this is trajectory data
export interface Traced {
  trajectory: Trajectory;
  data: TracedData;
  timestamps: TracedTimestamps;
  relativeTimestamps: TracedRelativeTimestamps;
}

const traceds = ref<Traced[]>([]);
const isFused = ref<boolean>(false);

export function useTrajectoriesData() {
  const {read} = useStorageReader();
  const {isReady} = useStorageReady();
  const {selected} = useTrajectoriesSelection();

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
        selected.value === null
      ) {
        return;
      }

      const ts: Traced[] = [];

      for (const sT of selected.value) {
        const [data, timestamps, relativeTimestamps] = await worker.readTraced(
          file,
          band.value.name,
          integration.value.seconds,
          extractor.value.index,
          reducer.value.index,
          sT.index,
        );

        const t: Traced = {
          trajectory: sT,
          data: data,
          timestamps: timestamps,
          relativeTimestamps: relativeTimestamps,
        };

        ts.push(t);
      }

      traceds.value = ts;
    });
  };

  return {
    traceds: traceds,
    isFused: isFused,
    readTraced: readTraced,
  };
}
