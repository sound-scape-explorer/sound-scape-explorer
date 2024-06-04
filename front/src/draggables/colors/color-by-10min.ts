import type {Scale} from 'chroma-js';
import {useDate} from 'src/composables/date';
import {timeStore} from 'src/draggables/time/time-store';
import {mapRange} from 'src/utils/map-range';

export function useColorBy10min() {
  const {convertTimestampToDate} = useDate();

  const getColorByTenMinutes = (timestamp: number, scale: Scale): string => {
    const date = convertTimestampToDate(timestamp);
    const rangeStart = convertTimestampToDate(timeStore.min * 1000);
    const rangeEnd = convertTimestampToDate(timeStore.max * 1000);

    const rangeInMinutes = rangeEnd.diff(rangeStart, 'minutes');
    const currentMinuteFromStart = date.diff(rangeStart, 'minutes');

    const rangedMinute = mapRange(
      currentMinuteFromStart,
      0,
      rangeInMinutes,
      0,
      1,
    );

    return scale(rangedMinute).css();
  };

  return {
    getColorByTenMinutes: getColorByTenMinutes,
  };
}
