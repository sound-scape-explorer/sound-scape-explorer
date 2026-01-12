import {DATE_FORMAT as DATE_FORMAT_NEW} from '@shared/constants';
import {addHours, format} from 'date-fns';
import {formatInTimeZone, fromZonedTime} from 'date-fns-tz';
import {useClientSettings} from 'src/composables/use-client-settings';
import {useTimezone} from 'src/composables/use-timezone';

export function useDateTime() {
  const {timeshift} = useClientSettings();
  const {tz} = useTimezone();

  const applyShift = (date: Date): Date => {
    return addHours(date, timeshift.value);
  };

  const stringToDate = (localString: string): Date => {
    let date: Date = new Date(localString);

    if (tz.value !== undefined) {
      date = fromZonedTime(localString, tz.value);
    }

    date = applyShift(date);
    return date;
  };

  const dateToString = (date: Date): string => {
    if (tz.value !== undefined) {
      return formatInTimeZone(date, tz.value, DATE_FORMAT_NEW);
    }

    return format(date, DATE_FORMAT_NEW);
  };

  const stringToTimestamp = (localString: string): number => {
    const date = stringToDate(localString);
    return date.getTime();
  };

  const timestampToString = (t: number): string => {
    const date = timestampToDate(t);
    return dateToString(date);
  };

  const timestampToDate = (t: number): Date => {
    let date = new Date(t);
    return applyShift(date);
  };

  const dateToTimestamp = (date: Date): number => date.getTime();

  const getHours = (date: Date): number => {
    if (tz.value) {
      const t = dateToTimestamp(date);
      const hourString = formatInTimeZone(t, tz.value, 'HH');
      return Number(hourString);
    }

    return date.getHours();
  };

  const getTime = (
    date: Date,
  ): {hours: number; minutes: number; seconds: number} => {
    const hours = getHours(date);
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();

    return {
      hours,
      minutes,
      seconds,
    };
  };

  return {
    stringToDate,
    stringToTimestamp,
    dateToString,
    dateToTimestamp,
    timestampToString,
    timestampToDate,
    getTime,
  };
}
