import {reactive} from 'vue';
import {fileRef} from './useFile';
import {workerRef} from './useWorker';

interface IntegrationReactive {
  value: number | null;
}

export const integrationRef = reactive<IntegrationReactive>({
  value: null,
});

export function useIntegration() {
  const setIntegration = async (integrationName: string) => {
    if (fileRef.value === null || workerRef.value === null) {
      return;
    }

    integrationRef.value = await workerRef.value.readSecondsFromIntegration(
      fileRef.value,
      integrationName,
    );
  };

  return {
    setIntegration: setIntegration,
  };
}
