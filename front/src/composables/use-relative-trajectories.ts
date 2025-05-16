import {type TrajectoryDto} from '@shared/dtos';
import {useStorageReader} from 'src/composables/use-storage-reader';
import {useViewSelectionNew} from 'src/composables/use-view-selection-new';
import {ref} from 'vue';

export interface RelativeTrajectory {
  trajectory: TrajectoryDto;
  distances: number[];
  timestamps: number[];
  deciles: [number, number][];
}

const relativeTrajectories = ref<RelativeTrajectory[] | null>(null);

export function useRelativeTrajectories() {
  const {read: r} = useStorageReader();

  const read = async () => {
    await r(async (worker, file) => {
      const {extraction, band, integration, reducer} = useViewSelectionNew();

      if (
        extraction.value === null ||
        band.value === null ||
        integration.value === null ||
        reducer.value === null
      ) {
        return;
      }

      const trajectories = extraction.value.trajectories;

      const newRelativeTrajectories: RelativeTrajectory[] = [];

      for (const trajectory of trajectories) {
        const {distances, timestamps, deciles} =
          await worker.readRelativeTrajectories(
            file,
            extraction.value.index,
            band.value.index,
            integration.value.index,
            reducer.value.index,
            trajectory.index,
          );

        const newRelativeTrajectory: RelativeTrajectory = {
          trajectory,
          distances,
          timestamps,
          deciles,
        };

        newRelativeTrajectories.push(newRelativeTrajectory);
      }

      relativeTrajectories.value = newRelativeTrajectories;
    });
  };

  const filter = (indices: number[]): RelativeTrajectory[] => {
    if (relativeTrajectories.value === null) {
      return [];
    }

    return relativeTrajectories.value.filter((rT) =>
      indices.includes(rT.trajectory.index),
    );
  };

  return {
    relativeTrajectories,
    filter,
    read,
  };
}
