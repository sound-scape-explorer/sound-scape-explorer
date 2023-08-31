import type {Data} from 'plotly.js-dist-min';
import {cyclingScaleRef} from 'src/components/Scatter/useScatterColorScale';
import type {TracedRef} from 'src/hooks/useTraced';
import type {Trajectory} from 'src/hooks/useTrajectories';

import {getTracedColors} from './get-traced-colors';
import {interpolateArray} from './interpolate-array';
import {sumArraysIndexWise} from './sum-arrays-index-wise';

export function traceAverageTrajectory(traceds: TracedRef['value']) {
  const isThreeDimensional = typeof traceds[0].data?.[2] !== 'undefined';
  const scatterType = isThreeDimensional ? 'scatter3d' : 'scatter';

  let axisLength = -1;
  interface IData {
    x: number[];
    y: number[];
    z: number[];
  }

  let trajectory: Trajectory = null as unknown as Trajectory;
  let relativeTimestamps: number[] = [];

  const datas: IData[] = [];

  // Pick the longest trajectory
  for (const traced of traceds) {
    if (traced.data.length > axisLength) {
      axisLength = traced.data.length;
      trajectory = traced.trajectory;
      relativeTimestamps = traced.relativeTimestamps;
    }
  }

  // Interpolating
  for (const traced of traceds) {
    const data = {} as IData;
    data.x = traced.data.map((coords) => coords[0]);
    data.y = traced.data.map((coords) => coords[1]);
    if (isThreeDimensional) {
      data.z = traced.data.map((coords) => coords[2]);
    }

    if (data.x.length < axisLength) {
      data.x = interpolateArray(data.x, axisLength);
      data.y = interpolateArray(data.y, axisLength);
      if (isThreeDimensional) {
        data.z = interpolateArray(data.z, axisLength);
      }
    }

    datas.push(data);
  }

  // Colors
  const colors = getTracedColors(
    relativeTimestamps,
    trajectory.start,
    trajectory.step,
    cyclingScaleRef.value,
  );

  // Trace
  const averageTrace: Data = {
    x: sumArraysIndexWise({
      arrays: datas.map((data) => data.x),
      doAveraging: true,
    }),
    y: sumArraysIndexWise({
      arrays: datas.map((data) => data.y),
      doAveraging: true,
    }),
    z: isThreeDimensional
      ? sumArraysIndexWise({
        arrays: datas.map((data) => data.z),
        doAveraging: true,
      })
      : undefined,
    name: 'Averaged Trace',
    type: scatterType,
    mode: 'lines',
    line: {
      color: colors,
      width: 4,
    },
  };

  return averageTrace;
}
