import {reactive, watchEffect} from 'vue';
import {bandRef} from './useBand';
import {integrationRef} from './useIntegration';
import {reducerRef} from './useReducer';
import {fileRef} from './useFile';
import {workerRef} from './useWorker';
import {configTrajectoryRef} from './useConfigTrajectories';

interface TrajectoriesRef {
  value: number[][] | null;
}

export const trajectoriesRef = reactive<TrajectoriesRef>({
  value: null,
});

export function useStorageTrajectories() {
  const readTrajectory = async () => {
    if (
      workerRef.value === null ||
      fileRef.value === null ||
      bandRef.value === null ||
      integrationRef.value === null ||
      configTrajectoryRef.value === null ||
      reducerRef.value === null
    ) {
      return;
    }

    trajectoriesRef.value = await workerRef.value.readTrajectory(
      fileRef.value,
      bandRef.value,
      integrationRef.value,
      configTrajectoryRef.value.index,
      reducerRef.value.index,
    );
  };

  watchEffect(readTrajectory);
}
