import {type MetricDto} from '@shared/dtos';
import {useCallback} from 'react';

export function useMetricSlug() {
  const getSlug = useCallback((d: MetricDto) => {
    return `${d.index}-${d.impl}`;
  }, []);

  return {
    getSlug,
  };
}
