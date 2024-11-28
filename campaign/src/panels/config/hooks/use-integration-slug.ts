import {useCallback} from 'react';
import  {type ConfigIntegration} from 'src/panels/config/hooks/use-integration-state.ts';

export function useIntegrationSlug() {
  const getSlug = useCallback((integration: ConfigIntegration) => {
    return `${integration.index}-${integration.name}`;
  }, []);

  return {
    getSlug,
  };
}
