import {useStorageReader} from 'src/composables/storage-reader';
import {useScatterTraces} from 'src/scatter/scatter-traces';
import {reactive, watchEffect} from 'vue';

import {useTraced} from './useTraced';

export interface Trajectory {
  index: number;
  name: string;
  start: number;
  end: number;
  labelProperty: string;
  labelValue: string;
  step: number;
}

interface TrajectoriesRef {
  value: Trajectory[] | null;
}

export const trajectoriesRef = reactive<TrajectoriesRef>({
  value: null,
});

interface SelectedTrajectoriesRef {
  value: Trajectory[];
}

export const selectedTrajectoriesRef = reactive<SelectedTrajectoriesRef>({
  value: [],
});

export function useTrajectories() {
  const {readTraced} = useTraced();
  const {renderTraces} = useScatterTraces();
  const {read} = useStorageReader();

  const readTrajectories = () =>
    read(async (worker, file) => {
      trajectoriesRef.value = await worker.readTrajectories(file);
    });

  watchEffect(readTrajectories);

  const selectTrajectories = async (names: string[]) => {
    if (trajectoriesRef.value === null) {
      return;
    }

    selectedTrajectoriesRef.value = trajectoriesRef.value.filter((trajectory) =>
      names.includes(trajectory.name),
    );

    await readTraced();
    renderTraces();
  };

  const resetTrajectories = () => {
    selectedTrajectoriesRef.value = [];
  };

  return {
    selectTrajectories: selectTrajectories,
    resetTrajectories: resetTrajectories,
  };
}
