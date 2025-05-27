import {getDayOfYear} from 'src/utils/time';

// todo: remove me?
export function getTrajectoryRelativeOptions(
  start: number, // timestamps in unix milliseconds
  step: number, // seconds
): [number, number] {
  let radix = 1;
  let offset = 0;

  if (step === 60 * 60) {
    radix = 24;
    offset = new Date(start).getHours();
  } else if (step === 60 * 60 * 24) {
    radix = 365;
    offset = getDayOfYear(start);
  } else if (step === 60 * 60 * 24 * 30) {
    radix = 12;
    offset = new Date(start).getMonth();
  }

  return [radix, offset];
}
