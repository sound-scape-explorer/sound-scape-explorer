import type {Scale} from 'chroma-js';
import {useDate} from 'src/composables/use-date';
import {useDraggableTime} from 'src/draggables/time/use-draggable-time';
import {mapRange} from 'src/utils/map-range';

export function useColorBy1h() {
  const {convertTimestampToDate} = useDate();
  const {min, max} = useDraggableTime();

  const getColorByOneHour = (timestamp: number, scale: Scale): string => {
    const date = convertTimestampToDate(timestamp);
    const rangeStart = convertTimestampToDate(min.value * 1000);
    const rangeEnd = convertTimestampToDate(max.value * 1000);
    const rangeInHours = rangeEnd.diff(rangeStart, 'hours');
    const currentHourFromStart = date.diff(rangeStart, 'hours');
    const rangedHour = mapRange(currentHourFromStart, 0, rangeInHours, 0, 1);
    return scale(rangedHour).css();
  };

  return {
    getColorByOneHour: getColorByOneHour,
  };
}
