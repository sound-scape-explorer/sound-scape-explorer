import type {Color, Scale} from 'chroma-js';
import type {Traced} from 'src/hooks/useTraced';

import {getTrajectoryRelativeOptions} from './get-trajectory-relative-options';

export function getTracedColors(traced: Traced, scale: Scale<Color>): string[] {
  const [radix, offset] = getTrajectoryRelativeOptions(traced.trajectory);

  const colors = traced.relativeTimestamps.map((rT) => {
    const relative = (rT + offset) % radix;
    const color = scale(relative / radix).hex();
    return color;
  });

  return colors;
}
