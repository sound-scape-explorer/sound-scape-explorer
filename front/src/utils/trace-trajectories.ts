import type {Data} from 'plotly.js-dist-min';
import {cyclingScaleRef} from 'src/components/Scatter/useScatterColorScale';
import type {TracedRef} from 'src/hooks/useTraced';

import {transformTimestampToRelative} from './transform-timestamp-to-relative';

export function traceTrajectories(traceds: TracedRef['value']) {
  const isThreeDimensional = typeof traceds[0].data?.[2] !== 'undefined';
  const scatterType = isThreeDimensional ? 'scatter3d' : 'scatter';

  const traces = [];

  for (const traced of traceds) {
    const colors = traced.timestamps.map((t) => {
      const relative = transformTimestampToRelative(t, traced.trajectory.start);
      // TODO: Make this dynamic
      const color = cyclingScaleRef.value(relative.hour / 24).hex(); // hourly
      // const color = cyclingScaleRef.value(relative.day / 365).hex(); // daily
      // const color = cyclingScaleRef.value(relative.month / 12).hex(); // monthly
      // const color = cyclingScaleRef.value(relative.year).hex(); // yearly
      return color;
    });

    console.log(colors);

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
      },
    };

    traces.push(trace);
  }

  return traces;
}
