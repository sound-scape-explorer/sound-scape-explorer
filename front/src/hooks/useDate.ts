import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import {DATE_FORMAT} from 'src/constants';

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

  const convertTimestampToIsoDate = (timestamp: number): string => {
    const date = dayjs(timestamp);
    return date.format(DATE_FORMAT);
  };

  return {
    convertTimestampToDate: convertTimestampToDate,
    convertTimestampToIsoDate: convertTimestampToIsoDate,
  };
}
