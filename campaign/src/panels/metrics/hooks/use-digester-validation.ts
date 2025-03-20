import {useCallback} from 'react';
import {
  type ConfigDigester,
  useDigesterState,
} from 'src/panels/metrics/hooks/use-digester-state.ts';
import {useGenericSectionValidation} from 'src/primitives/generic-section/use-generic-section-validation.ts';

export function useDigesterValidation() {
  const {digesters} = useDigesterState();
  const {collectValues, createValidation} = useGenericSectionValidation();

  const isImplValid = useCallback(
    (d: ConfigDigester) => {
      const impls = collectValues(digesters, d, 'impl');
      return !impls.includes(d.impl);
    },
    [digesters, collectValues],
  );

  const validate = useCallback(() => {
    const l = digesters.length;

    const v = createValidation();
    v.intent = l > 0 ? 'success' : 'primary';
    v.content = `${l} ${l > 1 ? 'digesters' : 'digester'}`;

    for (const d of digesters) {
      if (!isImplValid(d)) {
        v.intent = 'danger';
        v.content = 'invalid impls';
        break;
      }
    }

    return v;
  }, [digesters, createValidation, isImplValid]);

  return {
    isImplValid,
    validate,
  };
}
