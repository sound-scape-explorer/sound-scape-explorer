import {type BandDto} from '@shared/dtos';
import {useCallback} from 'react';

export function useBandSlug() {
  const getSlug = useCallback((band: BandDto) => {
    return `${band.index}-${band.name}`;
  }, []);

  return {
    getSlug,
  };
}
