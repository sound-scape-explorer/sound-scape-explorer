import {useDate} from 'src/hooks/useDate';
import {isHourDuringDay} from 'src/utils/is-hour-during-day';
import {
  alphaHighRef,
  dayColor,
  nightColor,
} from '../Scatter/useScatterColorScale';

export function useColorByDay() {
  const {convertTimestampToDate} = useDate();

  const getColorByDay = (timestamp: number) => {
    const date = convertTimestampToDate(timestamp * 1000);
    const hour = date.get('hours');
    const isDay = isHourDuringDay(hour);

    if (isDay) {
      return dayColor.alpha(alphaHighRef.value).css();
    }

    return nightColor.alpha(alphaHighRef.value).css();
  };

  return {
    getColorByDay: getColorByDay,
  };
}
