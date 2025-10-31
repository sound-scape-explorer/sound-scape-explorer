import {differenceInMinutes} from 'date-fns';
import {useTimelineRange} from 'src/components/timeline/use-timeline-range';
import {useColorUser} from 'src/composables/use-color-user';
import {useDateTime} from 'src/composables/use-date-time';
import {mapRange} from 'src/utils/math';

export function useColorBy10min() {
  const {timestampToDate} = useDateTime();
  const {start, end} = useTimelineRange();
  const {scale} = useColorUser();

  // todo: test me
  const getColorByTenMinutes = (timestamp: number): string => {
    const date = timestampToDate(timestamp);
    const rangeStart = timestampToDate(start.value * 1000);
    const rangeEnd = timestampToDate(end.value * 1000);

    const rangeInMinutes = differenceInMinutes(rangeEnd, rangeStart);
    const currentMinuteFromStart = differenceInMinutes(date, rangeStart);

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
    getColorByTenMinutes,
  };
}
