import {useDate} from 'src/hooks/useDate';
import {mapRange} from 'src/utils/map-range';
import {alphaHighRef, cyclingScaleRef} from '.././Scatter/useScatterColorScale';

export function useColorByCyclingDay() {
  const {convertTimestampToDate} = useDate();

  const getColorByCyclingDay = (timestamp: number): string => {
    const date = convertTimestampToDate(timestamp * 1000);
    const hour = date.get('hours');
    const rangedHour = mapRange(hour, 0, 24, 0, 1);

    return cyclingScaleRef.value(rangedHour).alpha(alphaHighRef.value).css();
  };

  return {
    getColorByCyclingDay: getColorByCyclingDay,
  };
}
