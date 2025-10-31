import {useColorsCycling} from 'src/composables/use-colors-cycling';
import {useDateTime} from 'src/composables/use-date-time';
import {mapRange} from 'src/utils/math';

export function useColorByHoursInDay() {
  const {timestampToDate, getTime} = useDateTime();
  const {scale} = useColorsCycling();

  const get = (timestamp: number): string => {
    const date = timestampToDate(timestamp);
    const {hours} = getTime(date);
    const rescaled = mapRange(hours, 0, 24, 0, 1);
    return scale.value(rescaled).css();
  };

  return {
    get,
  };
}
