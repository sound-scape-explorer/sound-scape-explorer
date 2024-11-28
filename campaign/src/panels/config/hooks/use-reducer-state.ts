import {atom} from 'jotai/index';
import {useCallback} from 'react';
import {getEnumKeys} from 'src/enums.ts';
import {type ConfigBand} from 'src/panels/config/hooks/use-band-state.ts';
import {type ConfigIntegration} from 'src/panels/config/hooks/use-integration-state.ts';
import {type ConfigNeuralExtractor} from 'src/panels/config/hooks/use-neural-extractor-state.ts';
import {useGenericSectionState} from 'src/primitives/generic-section/use-generic-section-state.ts';

const configReducersAtom = atom<ConfigReducer[]>([]);

export enum ReducerType {
  UMAP = 'umap',
  PCA = 'pca',
}

export interface ConfigReducer {
  index: number;
  type: keyof typeof ReducerType;
  dimensions: number;
  bands: ConfigBand[];
  integrations: ConfigIntegration[];
  extractors: ConfigNeuralExtractor[];
}

export function useReducerState() {
  const {
    items: reducers,
    setItems: setReducers,
    add,
    update,
  } = useGenericSectionState({
    atom: configReducersAtom,
    createItem: (index) => ({
      index,
      type: getEnumKeys(ReducerType)[0],
      dimensions: 3,
      bands: [],
      integrations: [],
      extractors: [],
    }),
  });

  const purgeBands = useCallback(
    (band: ConfigBand) => {
      const newReducers = [...reducers];

      for (const reducer of newReducers) {
        if (reducer.bands.includes(band)) {
          const index = reducer.bands.indexOf(band);
          reducer.bands.splice(index, 1);
        }
      }

      setReducers(newReducers);
    },
    [reducers, setReducers],
  );

  const purgeIntegrations = useCallback(
    (integration: ConfigIntegration) => {
      const newReducers = [...reducers];

      for (const reducer of newReducers) {
        if (reducer.integrations.includes(integration)) {
          const index = reducer.integrations.indexOf(integration);
          reducer.integrations.splice(index, 1);
        }
      }

      setReducers(newReducers);
    },
    [reducers, setReducers],
  );

  const purgeExtractors = useCallback(
    (extractor: ConfigNeuralExtractor) => {
      const newReducers = [...reducers];

      for (const reducer of newReducers) {
        if (reducer.extractors.includes(extractor)) {
          const index = reducer.extractors.indexOf(extractor);
          reducer.extractors.splice(index, 1);
        }
      }

      setReducers(newReducers);
    },
    [reducers, setReducers],
  );

  return {
    reducers,
    setReducers,
    add,
    update,
    purgeBands,
    purgeIntegrations,
    purgeExtractors,
  };
}
