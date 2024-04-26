import {useStorageReader} from 'src/composables/storage-reader';
import {useStorageReady} from 'src/composables/storage-ready';
import {useScatterTraces} from 'src/scatter/scatter-traces';
import {reactive, watch} from 'vue';

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

export function useStorageTrajectories() {
  const {readTraced} = useTraced();
  const {renderTraces} = useScatterTraces();
  const {isReady} = useStorageReady();

  const readTrajectories = async () => {
    if (!isReady.value) {
      return;
    }

    const {read} = useStorageReader();
    await read(async (worker, file) => {
      trajectoriesRef.value = await worker.readTrajectories(file);
    });
  };

  watch(isReady, readTrajectories);

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
