import {type TrajectoryDto} from '@shared/dtos';
import {useStorageReader} from 'src/composables/use-storage-reader';
import {useStorageReady} from 'src/composables/use-storage-ready';
import {useTrajectoriesSelection} from 'src/composables/use-trajectories-selection';
import {useViewSelectionNew} from 'src/composables/use-view-selection-new';
import {ref} from 'vue';

export type TrajectoryPath = number[][];
export type TrajectoryTimestamps = number[];

// todo: extend or merge
export interface TrajectoryData {
  trajectory: TrajectoryDto;
  path: TrajectoryPath;
  timestamps: TrajectoryTimestamps;
}

const traceds = ref<TrajectoryData[]>([]);
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

      const ts: TrajectoryData[] = [];

      for (const sT of selected.value) {
        const [path, timestamps] = await worker.readTrajectories(
          file,
          extraction.value.index,
          band.value.index,
          integration.value.index,
          reducer.value.index,
          sT.index,
        );

        const t: TrajectoryData = {
          trajectory: sT,
          path,
          timestamps,
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
