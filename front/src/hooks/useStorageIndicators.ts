import {onMounted, ref} from 'vue';
import {fileRef} from './useFile';
import {workerRef} from './useWorker';
import {bandRef} from './useBand';
import {integrationRef} from './useIntegration';

export interface StorageIndicator {
  index: number;
  name: string;
  values: number[];
}

export function useStorageIndicators() {
  const indicatorsRef = ref<StorageIndicator[] | null>(null);

  onMounted(async () => {
    if (
      fileRef.value === null ||
      workerRef.value === null ||
      bandRef.value === null ||
      integrationRef.value === null
    ) {
      return;
    }

    indicatorsRef.value = await workerRef.value.readIndicators(
      fileRef.value,
      bandRef.value,
      integrationRef.value,
    );
  });

  return {
    indicatorsRef: indicatorsRef,
  };
}
