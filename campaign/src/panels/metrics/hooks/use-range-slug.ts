import {type RangeDto} from '@shared/dtos';
import {useCallback} from 'react';

export function useRangeSlug() {
  const getSlug = useCallback((range: RangeDto) => {
    return `${range.index}-${range.name}`;
  }, []);

  return {
    getSlug,
  };
}
