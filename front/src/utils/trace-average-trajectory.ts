import type {Scale} from 'chroma-js';
import type {Data} from 'plotly.js-dist-min';
import type {Traced} from 'src/composables/trajectories-data';

import {buildAverageTrajectory} from './build-average-trajectory';
import {generateTraceDefaultDataOptions} from './generate-trace-default-data-options';
import {getTracedColors} from './get-traced-colors';

export function traceAverageTrajectory(traceds: Traced[], scale: Scale) {
  const {data, traced, isThreeDimensional} = buildAverageTrajectory(traceds);

  // Colors
  const colors = getTracedColors(
    traced.relativeTimestamps,
    traced.trajectory.start,
    traced.trajectory.step,
    scale,
  );

  // Trace
  const averageTrace: Data = {
    ...generateTraceDefaultDataOptions(isThreeDimensional, colors),
    name: 'Averaged Trace',
    x: data.x,
    y: data.y,
    z: data.z,
  };

  return averageTrace;
}
