import {useDate} from 'src/hooks/useDate';
import {mapRange} from 'src/utils/map-range';

import {cyclingScaleRef} from '../Scatter/useScatterColorScale';

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
