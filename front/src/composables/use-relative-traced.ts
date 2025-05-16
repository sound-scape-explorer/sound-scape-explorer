import {type TrajectoryDto} from '@shared/dtos';
import {useStorageReader} from 'src/composables/use-storage-reader';
import {useViewSelectionNew} from 'src/composables/use-view-selection-new';
import {ref} from 'vue';

export interface RelativeTraced {
  trajectory: TrajectoryDto;
  data: number[];
  timestamps: number[];
  deciles: [number, number][];
}

const relativeTraced = ref<RelativeTraced[] | null>(null);

export function useRelativeTraced() {
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

      const newRelativeTraced: RelativeTraced[] = [];

      for (const trajectory of trajectories) {
        const {data, timestamps, deciles} =
          await worker.readRelativeTrajectories(
            file,
            extraction.value.index,
            band.value.index,
            integration.value.index,
            reducer.value.index,
            trajectory.index,
          );

        const newRT: RelativeTraced = {
          trajectory,
          data,
          timestamps,
          deciles,
        };

        newRelativeTraced.push(newRT);
      }

      relativeTraced.value = newRelativeTraced;
    });
  };

  const selectRelativeTrajectories = (indices: number[]): RelativeTraced[] => {
    if (relativeTraced.value === null) {
      return [];
    }

    return relativeTraced.value.filter((rT) =>
      indices.includes(rT.trajectory.index),
    );
  };

  return {
    relativeTrajectories: relativeTraced,
    selectRelativeTrajectories,
    read,
  };
}
