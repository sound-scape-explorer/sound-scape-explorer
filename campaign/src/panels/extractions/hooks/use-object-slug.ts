import {useCallback} from 'react';

export function useObjectSlug() {
  const getSlug = useCallback((obj: Record<string, unknown>) => {
    return Object.entries(obj)
      .map(([key, value]) => `${key}:${value}`)
      .join('|');
  }, []);

  return {
    getSlug,
  };
}
