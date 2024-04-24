import type {DropdownOption} from 'src/common/DropdownOption';
import {convertToNaiveSelectOptions} from 'src/utils/convert-to-naive-select-options';
import {parseSelectionOption} from 'src/utils/parse-selection-option';
import {reactive, watchEffect} from 'vue';

import {useStorageReader} from '../composables/storage-reader';
import {type Band, bandsRef} from './useBands';
import {type Extractor, nnExtractorsRef} from './useExtractors';
import {type Integration, integrationsRef} from './useIntegrations';

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

interface ReducerSelectedRef {
  value: Reducer['name'] | null;
}

export const reducerSelectedRef = reactive<ReducerSelectedRef>({
  value: null,
});

interface ReducerOptionsRef {
  value: DropdownOption[];
}

export const reducerOptionsRef = reactive<ReducerOptionsRef>({
  value: [],
});

export function useReducers() {
  const {read} = useStorageReader();

  const readReducers = () =>
    read(async (worker, file) => {
      if (
        bandsRef.value === null ||
        integrationsRef.value === null ||
        nnExtractorsRef.value === null
      ) {
        return;
      }

      const reducersFromStorage = await worker.readReducers(file);
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
    });

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

  const generateReducerOptions = () => {
    if (reducersRef.value === null) {
      reducerOptionsRef.value = [];
      return;
    }

    const options = reducersRef.value.map(
      (r) => `${r.index} - ${r.name} (${r.dimensions}d)`,
    );

    reducerOptionsRef.value = convertToNaiveSelectOptions(options);
  };

  watchEffect(generateReducerOptions);

  watchEffect(() => {
    selectReducer(parseSelectionOption(reducerSelectedRef.value));
  });

  const resetReducer = () => {
    reducerRef.value = null;
    reducerSelectedRef.value = null;
  };

  return {
    reducerOptionsRef: reducerOptionsRef,
    resetReducer: resetReducer,
  };
}
