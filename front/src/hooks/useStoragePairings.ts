import {ref, watch} from 'vue';
import {bandRef} from './useBand';
import {integrationRef} from './useIntegration';
import {fileRef} from './useFile';
import {workerRef} from './useWorker';

export interface StoragePairing {
  index: number;
  name: string;
  values: number[][];
}

export function useStoragePairings() {
  const pairingsRef = ref<StoragePairing[] | null>(null);

  watch([workerRef, fileRef, bandRef, integrationRef], async () => {
    if (
      workerRef.value === null ||
      fileRef.value === null ||
      bandRef.value === null ||
      integrationRef.value === null
    ) {
      return;
    }

    pairingsRef.value = await workerRef.value.readPairings(
      fileRef.value,
      bandRef.value,
      integrationRef.value,
    );
  });

  return {
    pairingsRef: pairingsRef,
  };
}
