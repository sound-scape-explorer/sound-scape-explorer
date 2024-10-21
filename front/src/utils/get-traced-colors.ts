import {type Scale} from 'chroma-js';
import {type TracedRelativeTimestamps} from 'src/composables/use-trajectories-data';

import {getTrajectoryRelativeOptions} from './get-trajectory-relative-options';

export function getTracedColors(
  relativeTimestamps: TracedRelativeTimestamps,
  start: number,
  step: number,
  scale: Scale,
): string[] {
  const [radix, offset] = getTrajectoryRelativeOptions(start, step);

  const colors = relativeTimestamps.map((rT) => {
    const relative = (rT + offset) % radix;
    const color = scale(relative / radix).hex();
    return color;
  });

  return colors;
}
