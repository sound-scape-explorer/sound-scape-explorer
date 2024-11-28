import {useCallback} from 'react';
import {
  type MetricsIndex,
  useIndexState,
} from 'src/panels/metrics/hooks/use-index-state.ts';
import {useGenericSectionValidation} from 'src/primitives/generic-section/use-generic-section-validation.ts';

export function useIndexValidation() {
  const {collectValues, createValidation} = useGenericSectionValidation();
  const {indices} = useIndexState();

  const isTypeValid = useCallback(
    (ex: MetricsIndex) => {
      const types = collectValues(indices, ex, 'type');
      return !types.includes(ex.type);
    },
    [indices, collectValues],
  );

  const isOffsetValid = useCallback((ind: MetricsIndex) => ind.offset >= 0, []);

  const isStepValid = useCallback((ind: MetricsIndex) => ind.step > 0, []);

  const validate = useCallback(() => {
    const l = indices.length;

    const v = createValidation();
    v.intent = l > 0 ? 'success' : 'primary';
    v.content = `${l} ${l > 1 ? 'indices' : 'index'}`;

    for (const ind of indices) {
      if (!isTypeValid(ind)) {
        v.intent = 'danger';
        v.content = 'invalid types';
        break;
      }

      if (!isOffsetValid(ind)) {
        v.intent = 'warning';
        v.content = 'invalid offsets';
        break;
      }

      if (!isStepValid(ind)) {
        v.intent = 'warning';
        v.content = 'invalid steps';
        break;
      }
    }

    return v;
  }, [indices, createValidation, isTypeValid, isOffsetValid, isStepValid]);

  return {
    validate,
    isTypeValid,
    isOffsetValid,
    isStepValid,
  };
}
