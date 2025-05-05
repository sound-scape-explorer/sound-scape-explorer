import {type IndexDto} from '@shared/dtosOLD';
import {useCallback} from 'react';

export function useIndexSlug() {
  const getSlug = useCallback((ex: IndexDto) => {
    return `${ex.index}-${ex.impl}`;
  }, []);

  return {
    getSlug,
  };
}
