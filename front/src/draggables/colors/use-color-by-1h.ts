import {differenceInHours} from 'date-fns';
import {useTimelineRange} from 'src/components/timeline/use-timeline-range';
import {useColorUser} from 'src/composables/use-color-user';
import {useDateTime} from 'src/composables/use-date-time';
import {mapRange} from 'src/utils/math';

export function useColorBy1h() {
  const {timestampToDate} = useDateTime();
  const {start, end} = useTimelineRange();
  const {scale} = useColorUser();

  // todo: test me
  const getColorByOneHour = (timestamp: number): string => {
    const date = timestampToDate(timestamp);
    const rangeStart = timestampToDate(start.value * 1000);
    const rangeEnd = timestampToDate(end.value * 1000);
    const rangeInHours = differenceInHours(rangeEnd, rangeStart);
    const currentHourFromStart = differenceInHours(date, rangeStart);
    const rangedHour = mapRange(currentHourFromStart, 0, rangeInHours, 0, 1);
    return scale.value(rangedHour).css();
  };

  return {
    getColorByOneHour,
  };
}
