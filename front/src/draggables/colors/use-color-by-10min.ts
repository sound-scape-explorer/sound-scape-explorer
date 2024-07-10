import {useColorUser} from 'src/composables/use-color-user';
import {useDate} from 'src/composables/use-date';
import {useDraggableTime} from 'src/draggables/calendar/use-draggable-time';
import {mapRange} from 'src/utils/map-range';

export function useColorBy10min() {
  const {convertTimestampToDate} = useDate();
  const {min, max} = useDraggableTime();
  const {scale} = useColorUser();

  const getColorByTenMinutes = (timestamp: number): string => {
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

    return scale.value(rangedMinute).css();
  };

  return {
    getColorByTenMinutes: getColorByTenMinutes,
  };
}
