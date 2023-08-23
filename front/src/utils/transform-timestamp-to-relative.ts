import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

export function transformTimestampToRelative(
  timestamp: number,
  reference: number,
) {
  const difference = timestamp - reference;
  const hour = Math.floor(difference / (1000 * 60 * 60));
  const day = Math.floor(difference / (1000 * 60 * 60 * 24));
  const month = Math.floor(day / 30);
  const year = Math.floor(day / 365);

  return {
    hour: hour,
    day: day,
    month: month,
    year: year,
  };
}
