import {useCallback} from 'react';
import  {type ConfigTrajectory} from 'src/panels/metrics/hooks/use-trajectory-state.ts';

export function useTrajectorySlug() {
  const getSlug = useCallback((t: ConfigTrajectory) => {
    return `${t.index}-${t.name}`;
  }, []);

  return {
    getSlug,
  };
}
