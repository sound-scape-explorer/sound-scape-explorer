import type {Color, Scale} from 'chroma-js';
import type {TracedRelativeTimestamps} from 'src/hooks/useTraced';

import {getTrajectoryRelativeOptions} from './get-trajectory-relative-options';

export function getTracedColors(
  relativeTimestamps: TracedRelativeTimestamps,
  start: number,
  step: number,
  scale: Scale<Color>,
): string[] {
  const [radix, offset] = getTrajectoryRelativeOptions(start, step);

  const colors = relativeTimestamps.map((rT) => {
    const relative = (rT + offset) % radix;
    const color = scale(relative / radix).hex();
    return color;
  });

  return colors;
}
