import {reactive, watchEffect} from 'vue';
import {fileRef} from './useFile';
import {workerRef} from './useWorker';
import {configBandRef} from './useConfigBands';
import {configIntegrationRef} from './useConfigIntegrations';

interface GroupedMetasRef {
  value: string[][] | null;
}

export const groupedMetasRef = reactive<GroupedMetasRef>({
  value: null,
});

export function useStorageGroupedMetas() {
  const readGroupedMetas = async () => {
    if (
      workerRef.value === null ||
      fileRef.value === null ||
      configBandRef.value === null ||
      configIntegrationRef.value === null
    ) {
      return;
    }

    groupedMetasRef.value = await workerRef.value.readGroupedMetas(
      fileRef.value,
      configBandRef.value.name,
      configIntegrationRef.value.duration,
    );
  };

  watchEffect(readGroupedMetas);
}
