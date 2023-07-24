import {reactive, watchEffect} from 'vue';
import {workerRef} from './useWorker';
import {fileRef} from './useFile';

export interface ConfigIntegration {
  index: number;
  name: string;
  duration: number;
}

interface ConfigIntegrationRef {
  value: ConfigIntegration | null;
}

interface ConfigIntegrationsRef {
  value: ConfigIntegration[] | null;
}

export const configIntegrationRef = reactive<ConfigIntegrationRef>({
  value: null,
});

export const configIntegrationsRef = reactive<ConfigIntegrationsRef>({
  value: null,
});

export function useConfigIntegrations() {
  const readIntegrations = async (): Promise<void> => {
    if (workerRef.value === null || fileRef.value === null) {
      return;
    }

    const integrations = await workerRef.value.readConfigIntegrations(
      fileRef.value,
    );

    configIntegrationsRef.value = integrations;
  };

  watchEffect(readIntegrations);

  const selectIntegration = (name: string | null): void => {
    if (name === null) {
      configIntegrationRef.value = null;
      return;
    }

    if (configIntegrationsRef.value === null) {
      return;
    }

    configIntegrationRef.value = configIntegrationsRef.value.filter(
      (integration) => integration.name === name,
    )[0];
  };

  return {
    selectIntegration: selectIntegration,
  };
}
