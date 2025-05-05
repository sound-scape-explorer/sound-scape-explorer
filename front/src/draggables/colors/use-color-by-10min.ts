import {useTimelineRange} from 'src/components/timeline/use-timeline-range';
import {useColorUser} from 'src/composables/use-color-user';
import {useDate} from 'src/composables/use-date';
import {mapRange} from 'src/utils/math';

export function useColorBy10min() {
  const {convertTimestampToDate} = useDate();
  const {start, end} = useTimelineRange();
  const {scale} = useColorUser();

  // todo: test me
  const getColorByTenMinutes = (timestamp: number): string => {
    const date = convertTimestampToDate(timestamp);
    const rangeStart = convertTimestampToDate(start.value * 1000);
    const rangeEnd = convertTimestampToDate(end.value * 1000);

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
    getColorByTenMinutes,
  };
}
