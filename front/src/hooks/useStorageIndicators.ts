import {reactive, watchEffect} from 'vue';
import {storageFileRef} from './useStorageFile';
import {workerRef} from './useWorker';
import {bandRef} from './useBands';
import {integrationRef} from './useIntegrations';

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
      storageFileRef.value === null ||
      workerRef.value === null ||
      bandRef.value === null ||
      integrationRef.value === null
    ) {
      return;
    }

    // indicatorsRef.value = await workerRef.value.readIndicators(
    //   storageFileRef.value,
    //   bandRef.value.name,
    //   integrationRef.value.duration,
    // );
  };

  watchEffect(readIndicators);
}
