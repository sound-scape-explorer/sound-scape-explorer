import {onMounted, reactive} from 'vue';
import {fileRef} from './useFile';
import {workerRef} from './useWorker';

export interface StorageIntegrations {
  [band: string]: number;
}

interface IntegrationsRef {
  value: StorageIntegrations | null;
}

export const integrationsRef = reactive<IntegrationsRef>({
  value: null,
});

export function useStorageIntegrations() {
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
