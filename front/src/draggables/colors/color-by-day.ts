import chroma from 'chroma-js';
import {useDate} from 'src/composables/date';
import {isHourDuringDay} from 'src/utils/is-hour-during-day';

const dayColor = chroma('orange');
const nightColor = chroma('blue');

export function useColorByDay() {
  const {convertTimestampToDate} = useDate();

  const getColorByDay = (timestamp: number) => {
    const date = convertTimestampToDate(timestamp);
    const hour = date.get('hours');
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
