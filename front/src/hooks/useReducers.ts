import {reactive, watchEffect} from 'vue';

import {type Band, bandsRef} from './useBands';
import {type Extractor, nnExtractorsRef} from './useExtractors';
import {type Integration, integrationsRef} from './useIntegrations';
import {storageFileRef} from './useStorageFile';
import {workerRef} from './useWorker';

export interface ReducerFromStorage {
  index: number;
  name: string;
  dimensions: number;
  bandsNames: Band['name'][];
  integrationsNames: Integration['name'][];
  rangesNames: string[];
}

interface Reducer {
  index: number;
  name: string;
  dimensions: number;
  bands: Band[];
  integrations: Integration[];
  nnExtractors: Extractor[];
}

interface ReducerRef {
  value: Reducer | null;
}

export const reducerRef = reactive<ReducerRef>({
  value: null,
});

interface ReducersRef {
  value: Reducer[] | null;
}

export const reducersRef = reactive<ReducersRef>({
  value: null,
});

export function useReducers() {
  const readReducers = async () => {
    if (
      workerRef.value === null ||
      storageFileRef.value === null ||
      bandsRef.value === null ||
      integrationsRef.value === null ||
      nnExtractorsRef.value === null
    ) {
      return;
    }

    const reducersFromStorage = await workerRef.value.readReducers(
      storageFileRef.value,
    );

    const reducers: Reducer[] = [];

    for (const rFS of reducersFromStorage) {
      const reducer: Reducer = {
        index: rFS.index,
        name: rFS.name,
        dimensions: rFS.dimensions,
        bands: bandsRef.value.filter((band) =>
          rFS.bandsNames.includes(band.name),
        ),
        integrations: integrationsRef.value.filter((integration) =>
          rFS.integrationsNames.includes(integration.name),
        ),
        nnExtractors: nnExtractorsRef.value,
      };

      reducers.push(reducer);
    }

    reducersRef.value = reducers;
  };

  watchEffect(readReducers);

  const selectReducer = (index: number | null) => {
    if (index === null) {
      reducerRef.value = null;
      return;
    }

    if (reducersRef.value === null) {
      return;
    }

    reducerRef.value = reducersRef.value.filter(
      (reducer) => reducer.index === index,
    )[0];
  };

  return {
    selectReducer: selectReducer,
  };
}
