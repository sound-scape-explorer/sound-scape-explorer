import type {Scale} from 'chroma-js';
import {useDate} from 'src/composables/use-date';
import {mapRange} from 'src/utils/map-range';

export function useColorByCyclingDay() {
  const {convertTimestampToDate} = useDate();

  const getColorByCyclingDay = (timestamp: number, scale: Scale): string => {
    const date = convertTimestampToDate(timestamp);
    const hour = date.get('hours');
    const rangedHour = mapRange(hour, 0, 24, 0, 1);
    return scale(rangedHour).css();
  };

  return {
    getColorByCyclingDay: getColorByCyclingDay,
  };
}
