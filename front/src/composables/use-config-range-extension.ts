import {ConfigDto, type RangeDto} from '@shared/dtos';
import {addDays, max, min} from 'date-fns';
import {useDateTime} from 'src/composables/use-date-time';

export function useConfigRangeExtension() {
  const {stringToDate, dateToString} = useDateTime();

  const extend = (c: ConfigDto): ConfigDto => {
    const dates = c.files.map((f) => stringToDate(f.Date));
    const earliest = min(dates);
    const latest = max(dates);

    const earliestDayBefore = addDays(earliest, -1);
    const latestDayAfter = addDays(latest, 1);

    const rangeIndices = c.ranges.map((r) => r.index);
    const hasNoRange = rangeIndices.length === 0;
    const newRangeIndex = hasNoRange ? 0 : Math.min(...rangeIndices) - 1;

    const newRange: RangeDto = {
      index: newRangeIndex,
      name: '__FULL',
      start: dateToString(earliestDayBefore),
      end: dateToString(latestDayAfter),
    };

    const extendedConfig: ConfigDto = {
      ...c,
      ranges: [newRange, ...c.ranges],
    };

    return extendedConfig;
  };

  return {
    extend,
  };
}
