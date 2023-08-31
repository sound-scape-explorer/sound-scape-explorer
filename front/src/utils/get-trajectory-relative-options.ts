import type {Trajectory} from 'src/hooks/useTrajectories';

import {getDayOfYear} from './get-day-of-year';

export function getTrajectoryRelativeOptions(
  trajectory: Trajectory,
): [number, number] {
  let radix = 1;
  let offset = 0;

  if (trajectory.step === 60 * 60) {
    radix = 24;
    offset = new Date(trajectory.start).getHours();
  } else if (trajectory.step === 60 * 60 * 24) {
    radix = 365;
    offset = getDayOfYear(trajectory.start);
  } else if (trajectory.step === 60 * 60 * 24 * 30) {
    radix = 12;
    offset = new Date(trajectory.start).getMonth();
  }

  return [radix, offset];
}
