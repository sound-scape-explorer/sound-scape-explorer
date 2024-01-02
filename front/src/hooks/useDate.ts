import dayjs, {type Dayjs} from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import {DATE_FORMAT} from 'src/constants';

import {settingsStore} from '../components/Settings/settingsStore';
import {settingsRef} from './useStorageSettings';

dayjs.extend(relativeTime);
dayjs.extend(utc);
dayjs.extend(timezone);

export function useDate() {
  const convertTimestampToDate = (timestamp: number) => {
    if (settingsStore.applyTimezone === false) {
      return dayjs(timestamp);
    }

    if (settingsRef.value === null) {
      return dayjs(timestamp);
    }

    if (settingsRef.value.timezone === '') {
      return dayjs(timestamp);
    }

    return dayjs(timestamp).tz(settingsRef.value.timezone);
  };

  const convertTimestampToIsoDate = (timestamp: number): string => {
    const date = dayjs(timestamp);
    return date.format(DATE_FORMAT);
  };

  const convertDateToIsoDate = (date: Dayjs): string => {
    return date.format(DATE_FORMAT);
  };

  return {
    convertTimestampToDate: convertTimestampToDate,
    convertTimestampToIsoDate: convertTimestampToIsoDate,
    convertDateToIsoDate: convertDateToIsoDate,
  };
}
