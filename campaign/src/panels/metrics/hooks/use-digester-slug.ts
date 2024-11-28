import {useCallback} from 'react';
import  {type ConfigDigester} from 'src/panels/metrics/hooks/use-digester-state.ts';

export function useDigesterSlug() {
  const getSlug = useCallback((d: ConfigDigester) => {
    return `${d.index}-${d.type}`;
  }, []);

  return {
    getSlug,
  };
}
