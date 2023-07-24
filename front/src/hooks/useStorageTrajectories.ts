import {reactive, watchEffect} from 'vue';
import {reducerRef} from './useReducer';
import {fileRef} from './useFile';
import {workerRef} from './useWorker';
import {configTrajectoryRef} from './useConfigTrajectories';
import {configBandRef} from './useConfigBands';
import {configIntegrationRef} from './useConfigIntegrations';

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
      configBandRef.value === null ||
      configIntegrationRef.value === null ||
      configTrajectoryRef.value === null ||
      reducerRef.value === null
    ) {
      return;
    }

    trajectoriesRef.value = await workerRef.value.readTrajectory(
      fileRef.value,
      configBandRef.value.name,
      configIntegrationRef.value.duration,
      configTrajectoryRef.value.index,
      reducerRef.value.index,
    );
  };

  watchEffect(readTrajectory);
}
