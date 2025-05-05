import {type ReducerDto} from '@shared/dtos';
import {useCallback} from 'react';

export function useReducerSlug() {
  const getSlug = useCallback((reducer: ReducerDto) => {
    return `${reducer.index}-${reducer.impl}-${reducer.dimensions}`;
  }, []);

  return {
    getSlug,
  };
}
