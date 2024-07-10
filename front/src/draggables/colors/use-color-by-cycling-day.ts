import {useColorUser} from 'src/composables/use-color-user';
import {useDate} from 'src/composables/use-date';
import {mapRange} from 'src/utils/map-range';

export function useColorByCyclingDay() {
  const {convertTimestampToDate} = useDate();
  const {scale} = useColorUser();

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
