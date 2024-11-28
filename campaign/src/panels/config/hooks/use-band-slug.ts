import {useCallback} from 'react';
import {type ConfigBand} from 'src/panels/config/hooks/use-band-state.ts';

export function useBandSlug() {
  const getSlug = useCallback((band: ConfigBand) => {
    return `${band.index}-${band.name}`;
  }, []);

  return {
    getSlug,
  };
}
