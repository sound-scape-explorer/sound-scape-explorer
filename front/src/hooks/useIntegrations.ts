import {reactive, watchEffect} from 'vue';

import {storageFileRef} from './useStorageFile';
import {workerRef} from './useWorker';

export interface Integration {
  index: number;
  name: string;
  seconds: number;
}

interface IntegrationRef {
  value: Integration | null;
}

interface IntegrationsRef {
  value: Integration[] | null;
}

export const integrationRef = reactive<IntegrationRef>({
  value: null,
});

export const integrationsRef = reactive<IntegrationsRef>({
  value: null,
});

export function useIntegrations() {
  const readIntegrations = async (): Promise<void> => {
    if (workerRef.value === null || storageFileRef.value === null) {
      return;
    }

    const integrations = await workerRef.value.readIntegrations(
      storageFileRef.value,
    );

    integrationsRef.value = integrations;
  };

  watchEffect(readIntegrations);

  const selectIntegration = (index: number | null): void => {
    if (index === null) {
      integrationRef.value = null;
      return;
    }

    if (integrationsRef.value === null) {
      return;
    }

    integrationRef.value = integrationsRef.value.filter(
      (integration) => integration.index === index,
    )[0];
  };

  return {
    selectIntegration: selectIntegration,
  };
}
