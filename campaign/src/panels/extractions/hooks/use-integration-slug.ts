import {type IntegrationDto} from '@shared/dtos';
import {useCallback} from 'react';

export function useIntegrationSlug() {
  const getSlug = useCallback((integration: IntegrationDto) => {
    return `${integration.index}-${integration.name}`;
  }, []);

  return {
    getSlug,
  };
}
