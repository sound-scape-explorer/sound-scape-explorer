import {ReducerImpl} from '@shared/enums.ts';
import {atom} from 'jotai/index';
import {useCallback} from 'react';
import {REDUCER_DIMENSIONS_DEFAULT} from 'src/constants.ts';
import {type ConfigBand} from 'src/panels/config/hooks/use-band-state.ts';
import {type ConfigExtractor} from 'src/panels/config/hooks/use-extractor-state.ts';
import {type ConfigIntegration} from 'src/panels/config/hooks/use-integration-state.ts';
import {useGenericSectionState} from 'src/primitives/generic-section/use-generic-section-state.ts';

const configReducersAtom = atom<ConfigReducer[]>([]);

export interface ConfigReducer {
  index: number;
  impl: ReducerImpl;
  dimensions: number;
  bands: ConfigBand[];
  integrations: ConfigIntegration[];
  extractors: ConfigExtractor[];
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
      impl: ReducerImpl.umap,
      dimensions: REDUCER_DIMENSIONS_DEFAULT,
      bands: [],
      integrations: [],
      extractors: [],
    }),
  });

  const purgeBandsFromReducers = useCallback(
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

  const purgeIntegrationsFromReducers = useCallback(
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

  const purgeExtractorsFromReducers = useCallback(
    (extractor: ConfigExtractor) => {
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
    purgeBandsFromReducers,
    purgeIntegrationsFromReducers,
    purgeExtractorsFromReducers,
  };
}
