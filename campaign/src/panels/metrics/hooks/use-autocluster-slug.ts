import {useCallback} from 'react';
import {type ConfigAutocluster} from 'src/panels/metrics/hooks/use-autocluster-state.ts';

export function useAutoclusterSlug() {
  const getSlug = useCallback((autocluster: ConfigAutocluster) => {
    return `${autocluster.index}-${autocluster.impl}`;
  }, []);

  return {
    getSlug,
  };
}
