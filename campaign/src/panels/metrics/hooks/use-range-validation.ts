import {isAfter, isBefore} from 'date-fns';
import {useCallback} from 'react';
import {
  type ConfigRange,
  useRangeState,
} from 'src/panels/metrics/hooks/use-range-state.ts';
import {useGenericSectionValidation} from 'src/primitives/generic-section/use-generic-section-validation.ts';

export function useRangeValidation() {
  const {createValidation, collectValues} = useGenericSectionValidation();
  const {ranges} = useRangeState();

  const isNameValid = useCallback(
    (range: ConfigRange) => {
      if (range.name === '') {
        return false;
      }

      const names = collectValues(ranges, range, 'name');

      // noinspection RedundantIfStatementJS
      if (names.includes(range.name)) {
        return false;
      }

      return true;
    },
    [ranges, collectValues],
  );

  const isStartValid = useCallback(
    (range: ConfigRange) =>
      isBefore(new Date(range.start), new Date(range.end)),
    [],
  );

  const isEndValid = useCallback(
    (range: ConfigRange) => isAfter(new Date(range.end), new Date(range.start)),
    [],
  );

  const validate = useCallback(() => {
    const v = createValidation();

    v.intent = 'primary';
    v.content = `${ranges.length} ${ranges.length > 1 ? 'ranges' : 'range'}`;

    for (const range of ranges) {
      if (!isNameValid(range)) {
        v.intent = 'danger';
        v.content = 'invalid names';
        break;
      }

      if (!isStartValid(range) || !isEndValid(range)) {
        v.intent = 'danger';
        v.content = 'invalid ranges';
        break;
      }

      v.intent = 'success';
    }

    return v;
  }, [ranges, isStartValid, isEndValid, isNameValid, createValidation]);

  return {
    isNameValid,
    isStartValid,
    isEndValid,
    validate,
  };
}
