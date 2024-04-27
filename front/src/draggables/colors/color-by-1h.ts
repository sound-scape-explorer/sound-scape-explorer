import type {Scale} from 'chroma-js';
import {useDate} from 'src/composables/date';
import {timeStore} from 'src/draggables/time/time-store';
import {mapRange} from 'src/utils/map-range';

export function useColorBy1h() {
  const {convertTimestampToDate} = useDate();

  const getColorByOneHour = (timestamp: number, scale: Scale): string => {
    const date = convertTimestampToDate(timestamp);
    const rangeStart = convertTimestampToDate(timeStore.min * 1000);
    const rangeEnd = convertTimestampToDate(timeStore.max * 1000);
    const rangeInHours = rangeEnd.diff(rangeStart, 'hours');
    const currentHourFromStart = date.diff(rangeStart, 'hours');
    const rangedHour = mapRange(currentHourFromStart, 0, rangeInHours, 0, 1);
    return scale(rangedHour).css();
  };

  return {
    getColorByOneHour: getColorByOneHour,
  };
}
