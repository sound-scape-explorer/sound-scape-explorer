import {useCallback} from 'react';
import {
  type ConfigReducer,
  useReducerState,
} from 'src/panels/config/hooks/use-reducer-state.ts';
import {useGenericSectionValidation} from 'src/primitives/generic-section/use-generic-section-validation.ts';

export function useReducerValidation() {
  const {createValidation} = useGenericSectionValidation();
  const {reducers} = useReducerState();

  const isDimensionsValid = useCallback((reducer: ConfigReducer) => {
    return reducer.dimensions === 2 || reducer.dimensions === 3;
  }, []);

  const validate = useCallback(() => {
    const v = createValidation();

    if (reducers.length === 0) {
      v.intent = 'danger';
      v.content = 'empty';
      return v;
    }

    for (const reducer of reducers) {
      if (!isDimensionsValid(reducer)) {
        v.intent = 'warning';
        v.content = 'invalid dimensions';
        break;
      }
    }

    return v;
  }, [reducers, isDimensionsValid, createValidation]);

  return {
    isDimensionsValid,
    validate,
  };
}
