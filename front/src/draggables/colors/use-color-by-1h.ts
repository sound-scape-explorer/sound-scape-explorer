import {useColorUser} from 'src/composables/use-color-user';
import {useDate} from 'src/composables/use-date';
import {useDraggableTime} from 'src/draggables/time/use-draggable-time';
import {mapRange} from 'src/utils/map-range';

export function useColorBy1h() {
  const {convertTimestampToDate} = useDate();
  const {min, max} = useDraggableTime();
  const {scale} = useColorUser();

  const getColorByOneHour = (timestamp: number): string => {
    const date = convertTimestampToDate(timestamp);
    const rangeStart = convertTimestampToDate(min.value * 1000);
    const rangeEnd = convertTimestampToDate(max.value * 1000);
    const rangeInHours = rangeEnd.diff(rangeStart, 'hours');
    const currentHourFromStart = date.diff(rangeStart, 'hours');
    const rangedHour = mapRange(currentHourFromStart, 0, rangeInHours, 0, 1);
    return scale.value(rangedHour).css();
  };

  return {
    getColorByOneHour: getColorByOneHour,
  };
}
