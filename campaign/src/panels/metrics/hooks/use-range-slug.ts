import {useCallback} from 'react';
import {type ConfigRange} from 'src/panels/metrics/hooks/use-range-state.ts';

export function useRangeSlug() {
  const getSlug = useCallback((range: ConfigRange) => {
    return `${range.index}-${range.name}`;
  }, []);

  return {
    getSlug,
  };
}
