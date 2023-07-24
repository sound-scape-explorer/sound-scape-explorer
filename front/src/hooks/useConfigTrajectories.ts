import {reactive, watchEffect} from 'vue';
import {fileRef} from './useFile';
import {workerRef} from './useWorker';

export interface ConfigTrajectory {
  index: number;
  name: string;
  start: number;
  end: number;
}

interface ConfigTrajectoryRef {
  value: ConfigTrajectory | null;
}

export const configTrajectoryRef = reactive<ConfigTrajectoryRef>({
  value: null,
});

interface ConfigTrajectoriesRef {
  value: ConfigTrajectory[] | null;
}

export const configTrajectoriesRef = reactive<ConfigTrajectoriesRef>({
  value: null,
});

export function useConfigTrajectories() {
  const selectTrajectory = (index: string | null) => {
    if (index === null) {
      configTrajectoryRef.value = null;
      return;
    }

    if (configTrajectoriesRef.value === null) {
      return;
    }

    const results = configTrajectoriesRef.value.filter(
      (trajectory) => trajectory.index === Number(index),
    );

    if (results.length !== 1) {
      throw new Error(`Unable to select trajectory with index ${index}`);
    }

    configTrajectoryRef.value = results[0];
  };

  const readConfigTrajectories = async () => {
    if (workerRef.value === null || fileRef.value === null) {
      return;
    }

    configTrajectoriesRef.value = await workerRef.value.readConfigTrajectories(
      fileRef.value,
    );
  };

  watchEffect(readConfigTrajectories);

  return {
    selectTrajectory: selectTrajectory,
  };
}
