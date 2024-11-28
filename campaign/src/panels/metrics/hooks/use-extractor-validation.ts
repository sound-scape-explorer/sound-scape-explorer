import {useCallback} from 'react';
import {
  type ConfigExtractor,
  useExtractorState,
} from 'src/panels/metrics/hooks/use-extractor-state.ts';
import {useGenericSectionValidation} from 'src/primitives/generic-section/use-generic-section-validation.ts';

export function useExtractorValidation() {
  const {collectValues, createValidation} = useGenericSectionValidation();
  const {extractors} = useExtractorState();

  const isTypeValid = useCallback(
    (ex: ConfigExtractor) => {
      const types = collectValues(extractors, ex, 'type');
      return !types.includes(ex.type);
    },
    [extractors, collectValues],
  );

  const validate = useCallback(() => {
    const l = extractors.length;

    const v = createValidation();
    v.intent = l > 0 ? 'success' : 'primary';
    v.content = `${l} ${l > 1 ? 'extractors' : 'extractor'}`;

    for (const ex of extractors) {
      if (!isTypeValid(ex)) {
        v.intent = 'danger';
        v.content = 'invalid types';
        break;
      }
    }

    return v;
  }, [extractors, createValidation, isTypeValid]);

  return {
    isTypeValid,
    validate,
  };
}
