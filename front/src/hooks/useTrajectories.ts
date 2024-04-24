import {useScatterTraces} from 'src/components/Scatter/useScatterTraces';
import {reactive, watchEffect} from 'vue';

import {useFileReader} from './file-reader';
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
  const {read} = useFileReader();

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
