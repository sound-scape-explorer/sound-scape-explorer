import {ref, watch} from 'vue';
import {fileRef} from './useFile';
import {workerRef} from './useWorker';
import {configBandRef} from './useConfigBands';
import {configIntegrationRef} from './useConfigIntegrations';

export interface StorageMatrix {
  index: number;
  name: string;
  values: number[];
}

export function useStorageMatrices() {
  const matricesRef = ref<StorageMatrix[] | null>(null);

  watch([workerRef, fileRef, configBandRef, configIntegrationRef], async () => {
    if (
      workerRef.value === null ||
      fileRef.value === null ||
      configBandRef.value === null ||
      configIntegrationRef.value === null
    ) {
      return;
    }

    matricesRef.value = await workerRef.value.readMatrices(
      fileRef.value,
      configBandRef.value.name,
      configIntegrationRef.value.duration,
    );
  });

  return {
    matricesRef: matricesRef,
  };
}
