import {useSetAtom} from 'jotai/index';
import {useCallback} from 'react';
import {
  bandsAtom,
  extractorsAtom,
  integrationsAtom,
  rangesAtom,
  reducersAtom,
} from 'src/atoms.ts';
import {
  type Band,
  type Extractor,
  type Integration,
  type Range_,
  type Reducer,
} from 'src/types.ts';

interface LoadConfigProps {
  bands: Band[];
  integrations: Integration[];
  ranges: Range_[];
  extractors: Extractor[];
  reducers: Reducer[];
}

export function useConfigLoader() {
  const setBands = useSetAtom(bandsAtom);
  const setIntegrations = useSetAtom(integrationsAtom);
  const setRanges = useSetAtom(rangesAtom);
  const setExtractors = useSetAtom(extractorsAtom);
  const setReducers = useSetAtom(reducersAtom);

  const loadConfig = useCallback(
    ({bands, integrations, ranges, extractors, reducers}: LoadConfigProps) => {
      setBands(bands);
      setIntegrations(integrations);
      setRanges(ranges);
      setExtractors(extractors);
      setReducers(reducers);
    },
    [setBands, setIntegrations, setRanges, setExtractors, setReducers],
  );

  return {
    loadConfig,
  };
}
