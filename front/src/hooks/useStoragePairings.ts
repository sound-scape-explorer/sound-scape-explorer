import {ref, watch} from 'vue';
import {fileRef} from './useFile';
import {workerRef} from './useWorker';
import {configBandRef} from './useConfigBands';
import {configIntegrationRef} from './useConfigIntegrations';

export interface StoragePairing {
  index: number;
  name: string;
  values: number[][];
}

export function useStoragePairings() {
  const pairingsRef = ref<StoragePairing[] | null>(null);

  watch([workerRef, fileRef, configBandRef, configIntegrationRef], async () => {
    if (
      workerRef.value === null ||
      fileRef.value === null ||
      configBandRef.value === null ||
      configIntegrationRef.value === null
    ) {
      return;
    }

    pairingsRef.value = await workerRef.value.readPairings(
      fileRef.value,
      configBandRef.value.name,
      configIntegrationRef.value.duration,
    );
  });

  return {
    pairingsRef: pairingsRef,
  };
}
