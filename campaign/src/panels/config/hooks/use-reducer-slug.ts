import {useCallback} from 'react';
import {type ConfigReducer} from 'src/panels/config/hooks/use-reducer-state.ts';

export function useReducerSlug() {
  const getSlug = useCallback((reducer: ConfigReducer) => {
    return `${reducer.index}-${reducer.type}-${reducer.dimensions}`;
  }, []);

  return {
    getSlug,
  };
}
