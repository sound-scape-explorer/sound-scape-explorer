import type {Data} from 'plotly.js-dist-min';
import {cyclingScaleRef} from 'src/components/Scatter/useScatterColorScale';
import {TRACE_WIDTH} from 'src/constants';
import type {TracedRef} from 'src/hooks/useTraced';

import {getTracedColors} from './get-traced-colors';

export function traceTrajectories(traceds: TracedRef['value']) {
  const isThreeDimensional = typeof traceds[0].data?.[2] !== 'undefined';
  const scatterType = isThreeDimensional ? 'scatter3d' : 'scatter';

  const traces = [];

  for (const traced of traceds) {
    const colors = getTracedColors(
      traced.relativeTimestamps,
      traced.trajectory.start,
      traced.trajectory.step,
      cyclingScaleRef.value,
    );

    const trace: Data = {
      x: traced.data.map((coordinates) => coordinates[0]),
      y: traced.data.map((coordinates) => coordinates[1]),
      z: isThreeDimensional
        ? traced.data.map((coordinates) => coordinates[2])
        : undefined,
      name: traced.trajectory.name,
      type: scatterType,
      mode: 'lines',
      line: {
        color: colors,
        width: TRACE_WIDTH,
      },
    };

    traces.push(trace);
  }

  return traces;
}
