import {reactive, watchEffect} from 'vue';
import {fileRef} from './useFile';
import {workerRef} from './useWorker';
import {configBandRef} from './useConfigBands';
import {configIntegrationRef} from './useConfigIntegrations';

interface GroupedFeaturesRef {
  value: number[][] | null;
}

export const groupedFeaturesRef = reactive<GroupedFeaturesRef>({
  value: null,
});

export function useStorageGroupedFeatures() {
  const readGroupedFeatures = async () => {
    if (
      workerRef.value === null ||
      fileRef.value === null ||
      configBandRef.value === null ||
      configIntegrationRef.value === null
    ) {
      return;
    }

    groupedFeaturesRef.value = await workerRef.value.readGroupedFeatures(
      fileRef.value,
      configBandRef.value.name,
      configIntegrationRef.value.duration,
    );
  };

  watchEffect(readGroupedFeatures);
}
