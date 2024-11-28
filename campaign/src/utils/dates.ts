import {format, setHours, setMinutes, setSeconds} from 'date-fns';
import dayjs, {type Dayjs} from 'dayjs';
import {DATE_FORMAT} from 'src/constants.ts';

// leave argument empty to get now
export function convertDateToString(date: Dayjs = dayjs()) {
  return date.format(DATE_FORMAT);
}

export function convertStringToDate(dateString: string): Dayjs {
  const date = dayjs(dateString);

  if (!date.isValid()) {
    throw new Error('Date is not valid');
  }

  return date;
}

export function getToday() {
  const now = new Date();
  const noHours = setHours(now, 0);
  const noMinutes = setMinutes(noHours, 0);
  return setSeconds(noMinutes, 0);
}

export function formatDateToString(date: Date): string {
  return format(date, DATE_FORMAT);
}
