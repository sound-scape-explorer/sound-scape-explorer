import {onMounted, ref} from 'vue';
import {fileRef} from './useFile';
import {workerRef} from './useWorker';

export interface StorageIntegrations {
  [band: string]: number;
}

export function useStorageIntegrations() {
  const integrationsRef = ref<StorageIntegrations | null>(null);

  onMounted(async () => {
    if (fileRef.value === null || workerRef.value === null) {
      return;
    }

    integrationsRef.value = await workerRef.value.readIntegrations(
      fileRef.value,
    );
  });

  return {
    integrationsRef: integrationsRef,
  };
}
