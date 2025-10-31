import chroma from 'chroma-js';
import {useDateTime} from 'src/composables/use-date-time';
import {isHourDuringDay} from 'src/utils/time';

const dayColor = chroma('orange');
const nightColor = chroma('blue');

// TODO: colors are fucked
export function useColorByDayOrNight() {
  const {timestampToDate, getTime} = useDateTime();

  const get = (timestamp: number) => {
    const date = timestampToDate(timestamp);
    const {hours} = getTime(date);
    const isDayTime = isHourDuringDay(hours);

    if (isDayTime) {
      return dayColor.css();
    }

    return nightColor.css();
  };

  return {
    get,
  };
}
