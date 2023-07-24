import {reactive, watchEffect} from 'vue';
import {fileRef} from './useFile';
import {workerRef} from './useWorker';
import {configBandRef} from './useConfigBands';
import {configIntegrationRef} from './useConfigIntegrations';
import {configReducerRef} from './useConfigReducers';

type StorageReducedFeatures = number[][];

interface ReducedFeaturesRef {
  value: StorageReducedFeatures | null;
}

export const reducedFeaturesRef = reactive<ReducedFeaturesRef>({
  value: null,
});

export function useStorageReducedFeatures() {
  const readReducedFeatures = async () => {
    if (
      workerRef.value === null ||
      fileRef.value === null ||
      configBandRef.value === null ||
      configIntegrationRef.value === null ||
      configReducerRef.value === null
    ) {
      return;
    }

    reducedFeaturesRef.value = await workerRef.value.readReducedFeatures(
      fileRef.value,
      configReducerRef.value.index,
      configBandRef.value.name,
      configIntegrationRef.value.duration,
    );
  };

  watchEffect(readReducedFeatures);
}
