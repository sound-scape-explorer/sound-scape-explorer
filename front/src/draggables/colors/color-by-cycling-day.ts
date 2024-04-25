import {useDate} from 'src/composables/date';
import {cyclingScaleRef} from 'src/scatter/scatter-color-scale';
import {mapRange} from 'src/utils/map-range';

export function useColorByCyclingDay() {
  const {convertTimestampToDate} = useDate();

  const getColorByCyclingDay = (timestamp: number): string => {
    const date = convertTimestampToDate(timestamp);
    const hour = date.get('hours');
    const rangedHour = mapRange(hour, 0, 24, 0, 1);
    return cyclingScaleRef.value(rangedHour).css();
  };

  return {
    getColorByCyclingDay: getColorByCyclingDay,
  };
}
