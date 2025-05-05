import {type TrajectoryDto} from '@shared/dtos';
import {useCallback} from 'react';

export function useTrajectorySlug() {
  const getSlug = useCallback((t: TrajectoryDto) => {
    return `${t.index}-${t.name}`;
  }, []);

  return {
    getSlug,
  };
}
