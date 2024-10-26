import chroma from 'chroma-js';
import {useDate} from 'src/composables/use-date';
import {isHourDuringDay} from 'src/utils/time';

const dayColor = chroma('orange');
const nightColor = chroma('blue');

export function useColorByDay() {
  const {getHourFromTimestamp} = useDate();

  const getColorByDay = (timestamp: number) => {
    const hour = getHourFromTimestamp(timestamp);
    const isDay = isHourDuringDay(hour);

    if (isDay) {
      return dayColor.css();
    }

    return nightColor.css();
  };

  return {
    getColorByDay: getColorByDay,
  };
}
