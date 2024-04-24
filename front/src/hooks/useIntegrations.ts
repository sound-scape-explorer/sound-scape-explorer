import type {DropdownOption} from 'src/common/DropdownOption';
import {convertToNaiveSelectOptions} from 'src/utils/convert-to-naive-select-options';
import {parseSelectionOption} from 'src/utils/parse-selection-option';
import {reactive, watchEffect} from 'vue';

import {useFileReader} from './file-reader';
import {reducerRef, reducerSelectedRef} from './useReducers';

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

interface IntegrationSelectedRef {
  value: Integration['name'] | null;
}

export const integrationSelectedRef = reactive<IntegrationSelectedRef>({
  value: null,
});

interface IntegrationOptionsRef {
  value: DropdownOption[];
}

export const integrationOptionsRef = reactive<IntegrationOptionsRef>({
  value: [],
});

export function useIntegrations() {
  const {read} = useFileReader();

  const readIntegrations = () =>
    read(async (worker, file) => {
      const integrations = await worker.readIntegrations(file);
      integrationsRef.value = integrations;
    });

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

  const generateIntegrationOptions = () => {
    if (reducerRef.value === null) {
      integrationOptionsRef.value = [];
      return;
    }

    const options = reducerRef.value.integrations.map(
      (integration) =>
        `${integration.index} - ${integration.name} (${integration.seconds} s)`,
    );

    integrationOptionsRef.value = convertToNaiveSelectOptions(options);
  };

  watchEffect(generateIntegrationOptions);

  watchEffect(() => {
    selectIntegration(parseSelectionOption(integrationSelectedRef.value));
  });

  const resetIntegration = () => {
    integrationRef.value = null;
    integrationSelectedRef.value = null;
  };

  const autoSelectIntegration = () => {
    if (reducerSelectedRef.value === null) {
      return;
    }

    if (integrationOptionsRef.value.length !== 1) {
      return;
    }

    integrationSelectedRef.value = integrationOptionsRef.value[0].value;
  };

  watchEffect(autoSelectIntegration);

  return {
    resetIntegration: resetIntegration,
  };
}
