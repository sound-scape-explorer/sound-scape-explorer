import {reactive, watchEffect} from 'vue';
import {bandRef} from './useBand';
import {integrationRef} from './useIntegration';
import {reducerRef} from './useReducer';
import {fileRef} from './useFile';
import {workerRef} from './useWorker';

interface TrajectoriesRef {
  value: number[][] | null;
}

export const trajectoriesRef = reactive<TrajectoriesRef>({
  value: null,
});

export function useStorageTrajectories() {
  const readTrajectories = async () => {
    if (
      workerRef.value === null ||
      fileRef.value === null ||
      bandRef.value === null ||
      integrationRef.value === null ||
      reducerRef.value === null
    ) {
      return;
    }

    trajectoriesRef.value = await workerRef.value.readTrajectories(
      fileRef.value,
      bandRef.value,
      integrationRef.value,
      reducerRef.value.index,
    );

    console.log(trajectoriesRef.value);
  };

  watchEffect(readTrajectories);
}
