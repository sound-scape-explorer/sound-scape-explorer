import {reactive, watchEffect} from 'vue';
import {fileRef} from './useFile';
import {workerRef} from './useWorker';
import {configBandRef} from './useConfigBands';
import {configIntegrationRef} from './useConfigIntegrations';

export interface StorageMetas {
  [property: string]: string[];
}

interface MetasRef {
  value: StorageMetas | null;
}

export const metasRef = reactive<MetasRef>({
  value: null,
});

export function useStorageMetas() {
  const readMetas = async () => {
    if (
      fileRef.value === null ||
      workerRef.value === null ||
      configBandRef.value === null ||
      configIntegrationRef.value === null
    ) {
      return;
    }

    metasRef.value = await workerRef.value.readMetas(
      fileRef.value,
      configBandRef.value.name,
      configIntegrationRef.value.duration,
    );
  };

  watchEffect(readMetas);
}
