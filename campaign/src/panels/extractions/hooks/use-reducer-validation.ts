import {type ExtractionDto, type ReducerDto} from '@shared/dtos';
import {useCallback} from 'react';
import {createDefaultValidation} from 'src/utils/validation';

export function useReducerValidation() {
  const isDimensionsValid = useCallback(
    (reducer: ReducerDto, extraction: ExtractionDto) => {
      if (reducer.dimensions !== 2 && reducer.dimensions !== 3) {
        return false;
      }

      const others = extraction.reducers
        .filter((r) => r.index !== reducer.index)
        .filter((r) => r.impl === reducer.impl)
        .filter((r) => r.dimensions === reducer.dimensions);

      return others.length === 0;
    },
    [],
  );

  const validate = useCallback(
    (extraction: ExtractionDto) => {
      const v = createDefaultValidation();
      const l = extraction.reducers.length;
      v.intent = l > 0 ? 'success' : 'primary';
      v.content = `${l} ${l > 1 ? 'reducers' : 'reducer'}`;

      if (l === 0) {
        v.intent = 'danger';
        v.content = 'empty';
        return v;
      }

      for (const reducer of extraction.reducers) {
        if (!isDimensionsValid(reducer, extraction)) {
          v.intent = 'warning';
          v.content = 'invalid dimensions';
          break;
        }
      }

      return v;
    },
    [isDimensionsValid],
  );

  return {
    validate,
    isDimensionsValid,
  };
}
