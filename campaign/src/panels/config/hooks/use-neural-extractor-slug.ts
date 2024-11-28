import {useCallback} from 'react';
import {type ConfigNeuralExtractor} from 'src/panels/config/hooks/use-neural-extractor-state.ts';

export function useNeuralExtractorSlug() {
  const getSlug = useCallback((ex: ConfigNeuralExtractor) => {
    return `${ex.index}-${ex.name}`;
  }, []);

  return {
    getSlug,
  };
}
