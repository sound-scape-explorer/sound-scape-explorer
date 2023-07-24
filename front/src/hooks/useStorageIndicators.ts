import {reactive, watchEffect} from 'vue';
import {fileRef} from './useFile';
import {workerRef} from './useWorker';
import {configBandRef} from './useConfigBands';
import {configIntegrationRef} from './useConfigIntegrations';

export interface StorageIndicator {
  index: number;
  name: string;
  values: number[];
}

interface IndicatorsRef {
  value: StorageIndicator[] | null;
}

export const indicatorsRef = reactive<IndicatorsRef>({
  value: null,
});

export function useStorageIndicators() {
  const readIndicators = async () => {
    if (
      fileRef.value === null ||
      workerRef.value === null ||
      configBandRef.value === null ||
      configIntegrationRef.value === null
    ) {
      return;
    }

    indicatorsRef.value = await workerRef.value.readIndicators(
      fileRef.value,
      configBandRef.value.name,
      configIntegrationRef.value.duration,
    );
  };

  watchEffect(readIndicators);
}
