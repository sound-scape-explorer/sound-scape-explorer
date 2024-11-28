import {useCallback} from 'react';
import {type ConfigExtractor} from 'src/panels/metrics/hooks/use-extractor-state.ts';

export function useExtractorSlug() {
  const getSlug = useCallback((ex: ConfigExtractor) => {
    return `${ex.index}-${ex.type}`;
  }, []);

  return {
    getSlug,
  };
}
