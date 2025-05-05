import {type TrajectoryDto} from '@shared/dtos';
import {useStorageReader} from 'src/composables/use-storage-reader';
import {useStorageReady} from 'src/composables/use-storage-ready';
import {useTrajectoriesSelection} from 'src/composables/use-trajectories-selection';
import {useViewSelectionNew} from 'src/composables/use-view-selection-new';
import {ref} from 'vue';

export type TracedData = number[][];
export type TracedTimestamps = number[];
export type TracedRelativeTimestamps = number[];

// this is trajectory data
export interface Traced {
  trajectory: TrajectoryDto;
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

    const {extraction, band, integration, reducer} = useViewSelectionNew();

    await read(async (worker, file) => {
      if (
        extraction.value === null ||
        band.value === null ||
        integration.value === null ||
        reducer.value === null ||
        selected.value === null
      ) {
        return;
      }

      const ts: Traced[] = [];

      for (const sT of selected.value) {
        const [data, timestamps, relativeTimestamps] = await worker.readTraced(
          file,
          extraction.value.index,
          band.value.index,
          integration.value.index,
          reducer.value.index,
          sT.index,
        );

        const t: Traced = {
          trajectory: sT,
          data,
          timestamps,
          relativeTimestamps,
        };

        ts.push(t);
      }

      traceds.value = ts;
    });
  };

  return {
    traceds,
    isFused,
    readTraced,
  };
}
