import {useColorsCycling} from 'src/composables/use-colors-cycling';
import {useDate} from 'src/composables/use-date';
import {mapRange} from 'src/utils/map-range';

export function useColorByCyclingDay() {
  const {convertTimestampToDate} = useDate();
  const {scale} = useColorsCycling();

  const getColorByCyclingDay = (timestamp: number): string => {
    const date = convertTimestampToDate(timestamp);
    const hour = date.get('hours');
    const rangedHour = mapRange(hour, 0, 24, 0, 1);
    return scale.value(rangedHour).css();
  };

  return {
    getColorByCyclingDay: getColorByCyclingDay,
  };
}
