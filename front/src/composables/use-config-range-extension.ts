import {ConfigDto, type RangeDto} from '@shared/dtos';
import {max, min} from 'date-fns';
import {useDateTime} from 'src/composables/use-date-time';

export function useConfigRangeExtension() {
  const {stringToTimestamp, dateToString} = useDateTime();

  const extend = (c: ConfigDto): ConfigDto => {
    const dates = c.files.map((f) => stringToTimestamp(f.Date));
    const earliest = min(dates);
    const latest = max(dates);

    const rangeIndices = c.ranges.map((r) => r.index);
    const hasNoRange = rangeIndices.length === 0;
    const newRangeIndex = hasNoRange ? 0 : Math.min(...rangeIndices) - 1;

    const newRange: RangeDto = {
      index: newRangeIndex,
      name: '__FULL',
      start: dateToString(earliest),
      end: dateToString(latest),
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
