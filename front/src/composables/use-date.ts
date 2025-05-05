import {TIMEZONE_DEFAULT} from '@shared/constants';
import dayjs, {type Dayjs} from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import {useClientSettings} from 'src/composables/use-client-settings';
import {useConfig} from 'src/composables/use-config';
import {DATE_FORMAT} from 'src/constants';

dayjs.extend(relativeTime);
dayjs.extend(utc);
dayjs.extend(timezone);

export function useDate() {
  const {config} = useConfig();
  const {isTimezoneActive, timeshift} = useClientSettings();

  const convertTimestampToDate = (timestamp: number) => {
    const shift = timeshift.value;

    if (!isTimezoneActive.value) {
      return dayjs(timestamp).add(shift, 'hours');
    }

    if (config.value === null) {
      return dayjs(timestamp).add(shift, 'hours');
    }

    if (config.value.settings.timezone === TIMEZONE_DEFAULT) {
      return dayjs(timestamp).add(shift, 'hours');
    }

    return dayjs(timestamp)
      .tz(config.value.settings.timezone)
      .add(shift, 'hours');
  };

  const convertTimestampToIsoDate = (timestamp: number): string => {
    const date = convertTimestampToDate(timestamp);
    return date.format(DATE_FORMAT);
  };

  const convertDateToIsoDate = (date: Dayjs): string => {
    return date.format(DATE_FORMAT);
  };

  const getHourFromTimestamp = (timestamp: number) => {
    const date = convertTimestampToDate(timestamp);
    return date.get('hours');
  };

  const convertDateStringToDate = (dateString: string): Dayjs => {
    return dayjs(dateString);
  };

  return {
    convertTimestampToDate,
    convertTimestampToIsoDate,
    convertDateToIsoDate,
    getHourFromTimestamp,
    convertDateStringToDate,
  };
}
