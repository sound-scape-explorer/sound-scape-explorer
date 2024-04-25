import type {Data} from 'plotly.js-dist-min';
import type {TracedRef} from 'src/hooks/useTraced';
import {cyclingScaleRef} from 'src/scatter/scatter-color-scale';

import {buildAverageTrajectory} from './build-average-trajectory';
import {generateTraceDefaultDataOptions} from './generate-trace-default-data-options';
import {getTracedColors} from './get-traced-colors';

export function traceAverageTrajectory(traceds: TracedRef['value']) {
  const {data, traced, isThreeDimensional} = buildAverageTrajectory(traceds);

  // Colors
  const colors = getTracedColors(
    traced.relativeTimestamps,
    traced.trajectory.start,
    traced.trajectory.step,
    cyclingScaleRef.value,
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
