import {ref, watch} from 'vue';
import {storageFileRef} from './useStorageFile';
import {workerRef} from './useWorker';
import {bandRef} from './useBands';
import {integrationRef} from './useIntegrations';

export interface StoragePairing {
  index: number;
  name: string;
  values: number[][];
}

export function useStoragePairings() {
  const pairingsRef = ref<StoragePairing[] | null>(null);

  watch([workerRef, storageFileRef, bandRef, integrationRef], async () => {
    if (
      workerRef.value === null ||
      storageFileRef.value === null ||
      bandRef.value === null ||
      integrationRef.value === null
    ) {
      return;
    }

    // pairingsRef.value = await workerRef.value.readPairings(
    //   storageFileRef.value,
    //   bandRef.value.name,
    //   integrationRef.value.seconds,
    // );
  });

  return {
    pairingsRef: pairingsRef,
  };
}
