import {useScatterTraces} from 'src/components/Scatter/useScatterTraces';
import {reactive, watchEffect} from 'vue';

import {storageFileRef} from './useStorageFile';
import {useTraced} from './useTraced';
import {workerRef} from './useWorker';

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
  value: Trajectory[] | null;
}

export const selectedTrajectoriesRef = reactive<SelectedTrajectoriesRef>({
  value: null,
});

export function useTrajectories() {
  const {readTraced} = useTraced();
  const {renderTraces} = useScatterTraces();

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

  const readTrajectories = async () => {
    if (workerRef.value === null || storageFileRef.value === null) {
      return;
    }

    trajectoriesRef.value = await workerRef.value.readTrajectories(
      storageFileRef.value,
    );
  };

  watchEffect(readTrajectories);

  return {
    selectTrajectories: selectTrajectories,
  };
}
