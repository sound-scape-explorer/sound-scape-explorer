import type {Data} from 'plotly.js-dist-min';
import {cyclingScaleRef} from 'src/components/Scatter/useScatterColorScale';
import type {TracedRef} from 'src/hooks/useTraced';

import {generateTraceDefaultDataOptions} from './generate-trace-default-data-options';
import {getTracedColors} from './get-traced-colors';
import {isTracedThreeDimensional} from './is-traced-three-dimensional';

export function traceTrajectories(traceds: TracedRef['value']) {
  const isThreeDimensional = isTracedThreeDimensional(traceds[0]);

  const traces = [];

  for (const traced of traceds) {
    const colors = getTracedColors(
      traced.relativeTimestamps,
      traced.trajectory.start,
      traced.trajectory.step,
      cyclingScaleRef.value,
    );

    const trace: Data = {
      ...generateTraceDefaultDataOptions(isThreeDimensional, colors),
      name: traced.trajectory.name,
      x: traced.data.map((coordinates) => coordinates[0]),
      y: traced.data.map((coordinates) => coordinates[1]),
      z: isThreeDimensional
        ? traced.data.map((coordinates) => coordinates[2])
        : undefined,
    };

    traces.push(trace);
  }

  return traces;
}
