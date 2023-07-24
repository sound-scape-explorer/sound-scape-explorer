import {reactive, watchEffect} from 'vue';
import {workerRef} from './useWorker';
import {fileRef} from './useFile';

export interface ConfigBand {
  index: number;
  name: string;
  low: number;
  high: number;
}

interface ConfigBandRef {
  value: ConfigBand | null;
}

interface ConfigBandsRef {
  value: ConfigBand[] | null;
}

export const configBandRef = reactive<ConfigBandRef>({
  value: null,
});

export const configBandsRef = reactive<ConfigBandsRef>({
  value: null,
});

export function useConfigBands() {
  const selectBand = (name: string | null): void => {
    if (name === null) {
      configBandRef.value = null;
      return;
    }

    if (configBandsRef.value === null) {
      return;
    }

    configBandRef.value = configBandsRef.value.filter(
      (band) => band.name === name,
    )[0];
  };

  const readBands = async (): Promise<void> => {
    if (workerRef.value === null || fileRef.value === null) {
      return;
    }

    configBandsRef.value = await workerRef.value.readConfigBands(fileRef.value);
  };

  watchEffect(readBands);

  return {
    selectBand: selectBand,
  };
}
