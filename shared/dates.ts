import {DATE_FORMAT} from '@shared/constants';
import {format, setHours, setMinutes, setSeconds} from 'date-fns';

export function getToday() {
  const now = new Date();
  const noHours = setHours(now, 0);
  const noMinutes = setMinutes(noHours, 0);
  return setSeconds(noMinutes, 0);
}

export function isDateValid(string: string): boolean {
  const regex =
    /^(20\d\d)-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])\s([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/;
  return regex.test(string);
}

export function findEarliestDate(dateStrings: string[]): Date {
  if (dateStrings.length === 0) {
    throw new RangeError('dateStrings must be greater than 0');
  }

  const dates = dateStrings.map((dateStr) => new Date(dateStr));

  const earliestDate = dates.reduce((earliest, current) => {
    return current < earliest ? current : earliest;
  }, dates[0]);

  return earliestDate;
}

// todo: remove me?
export function convertToUnixMilliseconds(dateString: string): number {
  const date = new Date(dateString);
  const milliseconds = date.getTime();
  return milliseconds;
}

function convertLocalTime(date: Date) {
  const newDate = new Date(date.getTime());
  const offset = date.getTimezoneOffset() * 60000;
  newDate.setTime(newDate.getTime() + offset);
  return newDate;
}

export function formatDateToString(date: Date, keepLocalTime = false): string {
  let toFormat = date;

  if (keepLocalTime) {
    toFormat = convertLocalTime(date);
  }

  return format(toFormat, DATE_FORMAT);
}
