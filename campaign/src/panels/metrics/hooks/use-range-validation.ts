import {type RangeDto} from '@shared/dtos';
import {isAfter, isBefore} from 'date-fns';
import {useCallback} from 'react';
import {useRangeState} from 'src/panels/extractions/hooks/use-range-state.ts';
import {createDefaultValidation} from 'src/utils/validation';

export function useRangeValidation() {
  const {ranges} = useRangeState();

  const isNameValid = useCallback(
    (range: RangeDto) => {
      if (range.name === '') {
        return false;
      }

      const names = ranges
        .filter((r) => r.index !== range.index)
        .map((r) => r.name);

      // noinspection RedundantIfStatementJS
      if (names.includes(range.name)) {
        return false;
      }

      return true;
    },
    [ranges],
  );

  const isStartValid = useCallback(
    (range: RangeDto) => isBefore(new Date(range.start), new Date(range.end)),
    [],
  );

  const isEndValid = useCallback(
    (range: RangeDto) => isAfter(new Date(range.end), new Date(range.start)),
    [],
  );

  const validate = useCallback(() => {
    const v = createDefaultValidation();

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
  }, [ranges, isStartValid, isEndValid, isNameValid]);

  return {
    isNameValid,
    isStartValid,
    isEndValid,
    validate,
  };
}
