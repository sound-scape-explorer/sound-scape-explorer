import dayjs, {type Dayjs} from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import {useStorageSettings} from 'src/composables/storage-settings';
import {DATE_FORMAT} from 'src/constants';
import {settingsStore} from 'src/draggables/settings/settings-store';

dayjs.extend(relativeTime);
dayjs.extend(utc);
dayjs.extend(timezone);

export function useDate() {
  const {settings} = useStorageSettings();

  const convertTimestampToDate = (timestamp: number) => {
    if (settingsStore.applyTimezone === false) {
      return dayjs(timestamp);
    }

    if (settings.value === null) {
      return dayjs(timestamp);
    }

    if (settings.value.timezone === '') {
      return dayjs(timestamp);
    }

    return dayjs(timestamp).tz(settings.value.timezone);
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
