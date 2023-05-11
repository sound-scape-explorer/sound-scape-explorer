import {ref, watch} from 'vue';
import {bandRef} from './useBand';
import {integrationRef} from './useIntegration';
import {fileRef} from './useFile';
import {workerRef} from './useWorker';

export interface StorageMatrix {
  index: number;
  name: string;
  values: number[];
}

export function useStorageMatrices() {
  const matricesRef = ref<StorageMatrix[] | null>(null);

  watch([workerRef, fileRef, bandRef, integrationRef], async () => {
    if (
      workerRef.value === null ||
      fileRef.value === null ||
      bandRef.value === null ||
      integrationRef.value === null
    ) {
      return;
    }

    matricesRef.value = await workerRef.value.readMatrices(
      fileRef.value,
      bandRef.value,
      integrationRef.value,
    );
  });

  return {
    matricesRef: matricesRef,
  };
}
