import {reactive, watchEffect} from 'vue';
import type {ConfigBand} from './useConfigBands';
import type {ConfigIntegration} from './useConfigIntegrations';
import {workerRef} from './useWorker';
import {fileRef} from './useFile';
import {loadingStore} from 'src/components/Loading/loadingStore';

export interface ConfigReducer {
  index: number;
  name: string;
  dimensions: number;
  bandsNames: ConfigBand['name'][];
  integrationsNames: ConfigIntegration['name'][];
  rangesNames: string[];
}

interface ConfigReducerRef {
  value: ConfigReducer | null;
}

interface ConfigReducersRef {
  value: ConfigReducer[] | null;
}

export const configReducerRef = reactive<ConfigReducerRef>({
  value: null,
});

export const configReducersRef = reactive<ConfigReducersRef>({
  value: null,
});

export function useConfigReducers() {
  const readReducers = async () => {
    if (workerRef.value === null || fileRef.value === null) {
      return;
    }

    configReducersRef.value = await workerRef.value.readConfigReducers(
      fileRef.value,
    );
  };

  watchEffect(readReducers);

  const selectReducer = (index: number | null) => {
    if (index === null) {
      configReducerRef.value === null;
      return;
    }

    if (configReducersRef.value === null) {
      return;
    }

    loadingStore.isLoading = true;

    configReducerRef.value = configReducersRef.value.filter(
      (reducer) => reducer.index === index,
    )[0];
  };

  return {
    selectReducer: selectReducer,
  };
}
