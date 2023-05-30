import {onMounted, reactive} from 'vue';
import {bandRef} from './useBand';
import {integrationRef} from './useIntegration';
import {reducerRef} from './useReducer';
import {fileRef} from './useFile';
import {workerRef} from './useWorker';

type StorageReducedFeatures = number[][];

interface ReducedFeaturesRef {
  value: StorageReducedFeatures | null;
}

export const reducedFeaturesRef = reactive<ReducedFeaturesRef>({
  value: null,
});

export function useStorageReducedFeatures() {
  onMounted(async () => {
    if (
      workerRef.value === null ||
      fileRef.value === null ||
      bandRef.value === null ||
      integrationRef.value === null ||
      reducerRef.value === null
    ) {
      return;
    }

    reducedFeaturesRef.value = await workerRef.value.readReducedFeatures(
      fileRef.value,
      reducerRef.value.index,
      bandRef.value,
      integrationRef.value,
    );
  });
}
