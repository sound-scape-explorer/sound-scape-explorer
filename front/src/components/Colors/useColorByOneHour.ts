import {useDate} from 'src/hooks/useDate';
import {mapRange} from 'src/utils/map-range';

import {alphaHighRef, chromaScaleRef} from '.././Scatter/useScatterColorScale';
import {timeStore} from '../Time/timeStore';

export function useColorByOneHour() {
  const {convertTimestampToDate} = useDate();

  const getColorByOneHour = (timestamp: number): string => {
    const date = convertTimestampToDate(timestamp * 1000);
    const rangeStart = convertTimestampToDate(timeStore.min * 1000);
    const rangeEnd = convertTimestampToDate(timeStore.max * 1000);
    const rangeInHours = rangeEnd.diff(rangeStart, 'hours');
    const currentHourFromStart = date.diff(rangeStart, 'hours');

    const rangedHour = mapRange(
      currentHourFromStart,
      rangeStart.unix(),
      rangeInHours,
      0,
      1,
    );

    return chromaScaleRef.value(rangedHour).alpha(alphaHighRef.value).css();
  };

  return {
    getColorByOneHour: getColorByOneHour,
  };
}
