import {reactive, watchEffect} from 'vue';
import {fileRef} from './useFile';
import {workerRef} from './useWorker';
import {bandRef} from './useBand';
import {integrationRef} from './useIntegration';

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
  };

  watchEffect(readIndicators);
}
