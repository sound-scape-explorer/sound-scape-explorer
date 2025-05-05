import {type ExtractorDto} from '@shared/dtos';
import {useCallback} from 'react';

export function useExtractorSlug() {
  const getSlug = useCallback((ex: ExtractorDto) => {
    return `${ex.index}-${ex.name}`;
  }, []);

  return {
    getSlug,
  };
}
