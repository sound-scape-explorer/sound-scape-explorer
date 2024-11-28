import {useCallback} from 'react';
import {
  type ConfigExtractor,
  useExtractorState,
} from 'src/panels/config/hooks/use-extractor-state.ts';
import {useGenericSectionValidation} from 'src/primitives/generic-section/use-generic-section-validation.ts';

export function useExtractorValidation() {
  const {createValidation, collectValues} = useGenericSectionValidation();
  const {extractors} = useExtractorState();

  const isNameValid = useCallback(
    (extractor: ConfigExtractor) => {
      if (extractor.name === '') {
        return false;
      }

      const names = collectValues(extractors, extractor, 'name');

      // noinspection RedundantIfStatementJS
      if (names.includes(extractor.name)) {
        return false;
      }

      return true;
    },
    [extractors, collectValues],
  );

  const isOffsetValid = useCallback(
    (extractor: ConfigExtractor) => extractor.offset >= 0,
    [],
  );

  const isStepValid = useCallback(
    (extractor: ConfigExtractor) => extractor.step > 0,
    [],
  );

  const validate = useCallback(() => {
    const v = createValidation();

    if (extractors.length === 0) {
      v.intent = 'danger';
      v.content = 'empty';
      return v;
    }

    for (const extractor of extractors) {
      if (!isNameValid(extractor)) {
        v.intent = 'warning';
        v.content = 'invalid names';
        break;
      }

      if (!isOffsetValid(extractor)) {
        v.intent = 'warning';
        v.content = 'invalid offsets';
        break;
      }

      if (!isStepValid(extractor)) {
        v.intent = 'warning';
        v.content = 'invalid steps';
        break;
      }
    }

    return v;
  }, [extractors, isNameValid, isOffsetValid, isStepValid, createValidation]);

  return {
    isNameValid,
    isOffsetValid,
    isStepValid,
    validate,
  };
}
