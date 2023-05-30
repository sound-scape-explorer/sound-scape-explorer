import {useDate} from 'src/hooks/useDate';
import {timeStore} from '../Time/timeStore';
import {mapRange} from 'src/utils/map-range';
import {alphaHighRef, chromaScaleRef} from '../Scatter/useScatterColorScale';

export function useColorByTenMinutes() {
  const {convertTimestampToDate} = useDate();

  const getColorByTenMinutes = (timestamp: number): string => {
    const date = convertTimestampToDate(timestamp * 1000);
    const rangeStart = convertTimestampToDate(timeStore.min * 1000);
    const rangeEnd = convertTimestampToDate(timeStore.max * 1000);

    const rangeInMinutes = rangeEnd.diff(rangeStart, 'minutes');
    const currentMinuteFromStart = date.diff(rangeStart, 'minutes');

    const rangedMinute = mapRange(
      currentMinuteFromStart,
      rangeStart.unix(),
      rangeInMinutes,
      0,
      1,
    );

    return chromaScaleRef.value(rangedMinute).alpha(alphaHighRef.value).css();
  };

  return {
    getColorByTenMinutes: getColorByTenMinutes,
  };
}
