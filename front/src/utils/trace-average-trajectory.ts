import type {Data} from 'plotly.js-dist-min';
import {cyclingScaleRef} from 'src/components/Scatter/useScatterColorScale';
import {TRACE_WIDTH} from 'src/constants';
import type {TracedRef} from 'src/hooks/useTraced';

import {buildAverageTrajectory} from './build-average-trajectory';
import {getTracedColors} from './get-traced-colors';

export function traceAverageTrajectory(traceds: TracedRef['value']) {
  const {data, traced, isThreeDimensional} = buildAverageTrajectory(traceds);

  const scatterType = isThreeDimensional ? 'scatter3d' : 'scatter';

  // Colors
  const colors = getTracedColors(
    traced.relativeTimestamps,
    traced.trajectory.start,
    traced.trajectory.step,
    cyclingScaleRef.value,
  );

  // Trace
  const averageTrace: Data = {
    x: data.x,
    y: data.y,
    z: data.z,
    name: 'Averaged Trace',
    type: scatterType,
    mode: 'lines',
    opacity: 0.8,
    line: {
      color: colors,
      width: TRACE_WIDTH,
    },
  };

  return averageTrace;
}
