import {useCallback} from 'react';
import {
  type ConfigDigester,
  useDigesterState,
} from 'src/panels/metrics/hooks/use-digester-state.ts';
import {useGenericSectionValidation} from 'src/primitives/generic-section/use-generic-section-validation.ts';

export function useDigesterValidation() {
  const {digesters} = useDigesterState();
  const {collectValues, createValidation} = useGenericSectionValidation();

  const isTypeValid = useCallback(
    (d: ConfigDigester) => {
      const types = collectValues(digesters, d, 'type');
      return !types.includes(d.type);
    },
    [digesters, collectValues],
  );

  const validate = useCallback(() => {
    const l = digesters.length;

    const v = createValidation();
    v.intent = l > 0 ? 'success' : 'primary';
    v.content = `${l} ${l > 1 ? 'digesters' : 'digester'}`;

    for (const d of digesters) {
      if (!isTypeValid(d)) {
        v.intent = 'danger';
        v.content = 'invalid types';
        break;
      }
    }

    return v;
  }, [digesters, createValidation, collectValues]);

  return {
    isTypeValid,
    validate,
  };
}
