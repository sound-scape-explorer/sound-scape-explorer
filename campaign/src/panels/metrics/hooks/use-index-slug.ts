import {useCallback} from 'react';
import {type MetricsIndex} from 'src/panels/metrics/hooks/use-index-state.ts';

export function useIndexSlug() {
  const getSlug = useCallback((ex: MetricsIndex) => {
    return `${ex.index}-${ex.type}`;
  }, []);

  return {
    getSlug,
  };
}
