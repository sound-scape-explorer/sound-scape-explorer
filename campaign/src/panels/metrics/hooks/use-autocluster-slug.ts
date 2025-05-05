import {type AutoclusterDto} from '@shared/dtos';
import {useCallback} from 'react';

export function useAutoclusterSlug() {
  const getSlug = useCallback((autocluster: AutoclusterDto) => {
    return `${autocluster.index}-${autocluster.impl}`;
  }, []);

  return {
    getSlug,
  };
}
