import {useCalendarRange} from 'src/components/timeline/use-calendar-range';
import {useColorUser} from 'src/composables/use-color-user';
import {useDate} from 'src/composables/use-date';
import {mapRange} from 'src/utils/map-range';

export function useColorBy1h() {
  const {convertTimestampToDate} = useDate();
  const {start, end} = useCalendarRange();
  const {scale} = useColorUser();

  // todo: test me
  const getColorByOneHour = (timestamp: number): string => {
    const date = convertTimestampToDate(timestamp);
    const rangeStart = convertTimestampToDate(start.value * 1000);
    const rangeEnd = convertTimestampToDate(end.value * 1000);
    const rangeInHours = rangeEnd.diff(rangeStart, 'hours');
    const currentHourFromStart = date.diff(rangeStart, 'hours');
    const rangedHour = mapRange(currentHourFromStart, 0, rangeInHours, 0, 1);
    return scale.value(rangedHour).css();
  };

  return {
    getColorByOneHour: getColorByOneHour,
  };
}
