import dayjs, {type Dayjs} from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import {useClientSettings} from 'src/composables/client-settings';
import {useStorageSettings} from 'src/composables/storage-settings';
import {DATE_FORMAT} from 'src/constants';

dayjs.extend(relativeTime);
dayjs.extend(utc);
dayjs.extend(timezone);

export function useDate() {
  const {settings} = useStorageSettings();
  const {applyTimezone, timeShift} = useClientSettings();

  const convertTimestampToDate = (timestamp: number) => {
    const shift = timeShift.value;

    if (applyTimezone.value === false) {
      return dayjs(timestamp).add(shift, 'hours');
    }

    if (settings.value === null) {
      return dayjs(timestamp).add(shift, 'hours');
    }

    if (settings.value.timezone === '') {
      return dayjs(timestamp).add(shift, 'hours');
    }

    return dayjs(timestamp).tz(settings.value.timezone).add(shift, 'hours');
  };

  const convertTimestampToIsoDate = (timestamp: number): string => {
    const date = convertTimestampToDate(timestamp);
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
