import type {Scale} from 'chroma-js';
import {useDate} from 'src/composables/use-date';
import {useDraggableTime} from 'src/draggables/time/use-draggable-time';
import {mapRange} from 'src/utils/map-range';

export function useColorBy10min() {
  const {convertTimestampToDate} = useDate();
  const {min, max} = useDraggableTime();

  const getColorByTenMinutes = (timestamp: number, scale: Scale): string => {
    const date = convertTimestampToDate(timestamp);
    const rangeStart = convertTimestampToDate(min.value * 1000);
    const rangeEnd = convertTimestampToDate(max.value * 1000);

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
