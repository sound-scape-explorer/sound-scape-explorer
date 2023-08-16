import {ref, watch} from 'vue';
import {storageFileRef} from './useStorageFile';
import {workerRef} from './useWorker';
import {bandRef} from './useBands';
import {integrationRef} from './useIntegrations';

export interface StorageMatrix {
  index: number;
  name: string;
  values: number[];
}

export function useStorageMatrices() {
  const matricesRef = ref<StorageMatrix[] | null>(null);

  watch([workerRef, storageFileRef, bandRef, integrationRef], async () => {
    if (
      workerRef.value === null ||
      storageFileRef.value === null ||
      bandRef.value === null ||
      integrationRef.value === null
    ) {
      return;
    }

    // matricesRef.value = await workerRef.value.readMatrices(
    //   storageFileRef.value,
    //   bandRef.value.name,
    //   integrationRef.value.seconds,
    // );
  });

  return {
    matricesRef: matricesRef,
  };
}
