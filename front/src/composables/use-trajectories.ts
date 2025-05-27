import {type TrajectoryDto} from '@shared/dtos';
import {useStorageReader} from 'src/composables/use-storage-reader';
import {useStorageReady} from 'src/composables/use-storage-ready';
import {useTrajectoriesSelection} from 'src/composables/use-trajectories-selection';
import {useViewSelection} from 'src/composables/use-view-selection';
import {ref} from 'vue';

export type TrajectoryPath = number[][];
export type TrajectoryTimestamps = number[];

// todo: extend or merge
export interface TrajectoryDtoWithData {
  trajectory: TrajectoryDto;
  path: TrajectoryPath;
  timestamps: TrajectoryTimestamps;
}

const trajectories = ref<TrajectoryDtoWithData[]>([]);
const isFused = ref<boolean>(false);

export function useTrajectories() {
  const {read} = useStorageReader();
  const {isReady} = useStorageReady();
  const {selected} = useTrajectoriesSelection();

  const readTrajectories = async () => {
    if (!isReady.value) {
      return;
    }

    const {extraction, band, integration, reducer} = useViewSelection();

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

      const ts: TrajectoryDtoWithData[] = [];

      for (const sT of selected.value) {
        const [path, timestamps] = await worker.readTrajectories(
          file,
          extraction.value.index,
          band.value.index,
          integration.value.index,
          reducer.value.index,
          sT.index,
        );

        const t: TrajectoryDtoWithData = {
          trajectory: sT,
          path,
          timestamps,
        };

        ts.push(t);
      }

      trajectories.value = ts;
    });
  };

  return {
    trajectories,
    isFused,
    readTrajectories,
  };
}
