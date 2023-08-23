import type {Data} from 'plotly.js-dist-min';
import {cyclingScaleRef} from 'src/components/Scatter/useScatterColorScale';
import type {TracedRef} from 'src/hooks/useTraced';

export function traceTrajectories(traceds: TracedRef['value']) {
  const isThreeDimensional = typeof traceds[0].data?.[2] !== 'undefined';
  const scatterType = isThreeDimensional ? 'scatter3d' : 'scatter';

  const traces = [];

  for (const traced of traceds) {
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
        color: cyclingScaleRef.value.colors(traced.data.length),
      },
    };

    traces.push(trace);
  }

  return traces;
}
