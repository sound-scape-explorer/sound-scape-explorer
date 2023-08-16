import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';

dayjs.extend(relativeTime);
dayjs.extend(utc);
dayjs.extend(timezone);

export function useDate() {
  const convertTimestampToDate = (timestamp: number, timezone?: string) => {
    if (timezone === '') {
      return dayjs(timestamp);
    }

    return dayjs(timestamp).tz(timezone);
  };

  return {
    convertTimestampToDate: convertTimestampToDate,
  };
}
