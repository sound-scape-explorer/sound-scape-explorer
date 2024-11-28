import {type Intent} from '@blueprintjs/core';
import {useCallback} from 'react';

interface I {
  index: number;
}

export interface Validation {
  intent: Intent;
  content: string;
}

export function useGenericSectionValidation() {
  const excludeItem = useCallback(<T extends I>(items: T[], item: T) => {
    return items.filter((o) => o.index !== item.index);
  }, []);

  const collectValues = useCallback(
    <T extends I>(items: T[], item: T, key: keyof T) => {
      const results = excludeItem(items, item);
      return results.map((o) => o[key]);
    },
    [excludeItem],
  );

  const createValidation = useCallback(() => {
    const v: Validation = {
      intent: 'success',
      content: 'OK',
    };

    return v;
  }, []);

  return {
    excludeItem,
    collectValues,
    createValidation,
  };
}
