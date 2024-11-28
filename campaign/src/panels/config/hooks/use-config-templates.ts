import {atom, useAtom} from 'jotai';
import {useCallback, useMemo, useState} from 'react';
import {
  type ConfigBand,
  useBandState,
} from 'src/panels/config/hooks/use-band-state.ts';
import {
  type ConfigIntegration,
  useIntegrationState,
} from 'src/panels/config/hooks/use-integration-state.ts';
import {
  type ConfigNeuralExtractor,
  useNeuralExtractorState,
} from 'src/panels/config/hooks/use-neural-extractor-state.ts';
import {
  type ConfigReducer,
  useReducerState,
} from 'src/panels/config/hooks/use-reducer-state.ts';

type TemplateKey = 'none' | 'coral-reefs';

export const templateKeyAtom = atom<TemplateKey>('none');

export function useConfigTemplates() {
  const [key, setKey] = useAtom(templateKeyAtom);

  const {bands, setBands} = useBandState();
  const {integrations, setIntegrations} = useIntegrationState();
  const {extractors, setExtractors} = useNeuralExtractorState();
  const {reducers, setReducers} = useReducerState();

  // saving custom (user)
  const [cBands, setCBands] = useState<ConfigBand[]>([]);
  const [cIntegrations, setCIntegrations] = useState<ConfigIntegration[]>([]);
  const [cExtractors, setCExtractors] = useState<ConfigNeuralExtractor[]>([]);
  const [cReducers, setCReducers] = useState<ConfigReducer[]>([]);

  const hasTemplate = useMemo(() => key !== 'none', [key]);

  const update = useCallback(
    (k: TemplateKey) => {
      setKey(k);

      switch (k) {
        case 'coral-reefs': {
          setCBands(bands);
          setBands([{index: 0, name: 'fish', low: 70, high: 2000}]);

          setCIntegrations(integrations);
          setIntegrations([{index: 0, name: 'i15', duration: 15}]);

          setCExtractors(extractors);
          setExtractors([
            {
              index: 0,
              name: 'vgg',
              type: 'VGGish',
              offset: 0,
              step: 1000,
              isPersist: false,
            },
          ]);

          setCReducers(reducers);
          setReducers([
            {
              index: 0,
              type: 'UMAP',
              dimensions: 2,
              bands: [],
              integrations: [],
              extractors: [],
            },
            {
              index: 1,
              type: 'UMAP',
              dimensions: 3,
              bands: [],
              integrations: [],
              extractors: [],
            },
          ]);

          break;
        }
        default: {
          setBands(cBands);
          setIntegrations(cIntegrations);
          setExtractors(cExtractors);
          setReducers(cReducers);
        }
      }
    },
    [
      setKey,
      bands,
      setBands,
      cBands,
      integrations,
      setIntegrations,
      cIntegrations,
      extractors,
      setExtractors,
      cExtractors,
      reducers,
      setReducers,
      cReducers,
    ],
  );

  return {
    key,
    update,
    hasTemplate,
  };
}
