import {type Scale} from 'chroma-js';
import {type Data} from 'plotly.js-dist-min';
import {type TrajectoryData} from 'src/composables/use-trajectories-data';
import {TRACE_WIDTH_2D, TRACE_WIDTH_3D} from 'src/constants';
import {interpolateArray, sumArraysIndexWise} from 'src/utils/arrays';
import {getDayOfYear} from 'src/utils/time';
import {getTrajectoryColors} from 'src/utils/trajectories-new';

export function isTracedThreeDimensional(traced: TrajectoryData): boolean {
  return traced.path[0].length === 3;
}

export function buildAverageTrajectory(traceds: TrajectoryData[]) {
  const isThreeDimensional = isTracedThreeDimensional(traceds[0]);

  interface IData {
    x: number[];
    y: number[];
    z: number[];
  }

  let longestTraced: TrajectoryData = traceds[0];

  const data: IData[] = [];

  // Pick the longest trajectory
  for (const traced of traceds) {
    if (traced.path.length > longestTraced.path.length) {
      longestTraced = traced;
    }
  }

  const length = longestTraced.path.length;

  // Interpolating
  for (const traced of traceds) {
    const d = {} as IData;
    d.x = traced.path.map((coords) => coords[0]);
    d.y = traced.path.map((coords) => coords[1]);
    if (isThreeDimensional) {
      d.z = traced.path.map((coords) => coords[2]);
    }

    if (d.x.length < length) {
      d.x = interpolateArray(d.x, length);
      d.y = interpolateArray(d.y, length);
      if (isThreeDimensional) {
        d.z = interpolateArray(d.z, length);
      }
    }

    data.push(d);
  }

  const payload = {
    x: sumArraysIndexWise({
      arrays: data.map((data) => data.x),
      doAveraging: true,
    }),
    y: sumArraysIndexWise({
      arrays: data.map((data) => data.y),
      doAveraging: true,
    }),
    z: isThreeDimensional
      ? sumArraysIndexWise({
        arrays: data.map((data) => data.z),
        doAveraging: true,
      })
      : undefined,
  };

  return {
    data: payload,
    traced: longestTraced,
    isThreeDimensional,
  };
}

// todo: remove me
export function getTrajectoryRelativeOptions(
  start: number, // timestamps in unix milliseconds
  step: number, // seconds
): [number, number] {
  let radix = 1;
  let offset = 0;

  if (step === 60 * 60) {
    radix = 24;
    offset = new Date(start).getHours();
  } else if (step === 60 * 60 * 24) {
    radix = 365;
    offset = getDayOfYear(start);
  } else if (step === 60 * 60 * 24 * 30) {
    radix = 12;
    offset = new Date(start).getMonth();
  }

  return [radix, offset];
}

type GenerateTraceDefaultDataOptions = Pick<
  Data,
  'type' & 'mode' & 'opacity' & 'line'
>;

function generateTraceDefaultDataOptions(
  isThreeDimensional: boolean,
  colors: string[],
): GenerateTraceDefaultDataOptions {
  const scatterType = isThreeDimensional ? 'scatter3d' : 'scatter';

  return {
    type: scatterType,
    mode: 'lines',
    opacity: 0.8,
    line: {
      color: colors,
      width: isThreeDimensional ? TRACE_WIDTH_3D : TRACE_WIDTH_2D,
    },
  };
}

export function traceAverageTrajectory(
  traceds: TrajectoryData[],
  scale: Scale,
) {
  const {data, traced, isThreeDimensional} = buildAverageTrajectory(traceds);

  const colors = getTrajectoryColors(traced, scale);

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

export function traceTrajectories(traceds: TrajectoryData[], scale: Scale) {
  const isThreeDimensional = isTracedThreeDimensional(traceds[0]);

  const traces = [];

  for (const traced of traceds) {
    const colors = getTrajectoryColors(traced, scale);
    const trace: Data = {
      ...generateTraceDefaultDataOptions(isThreeDimensional, colors),
      name: traced.trajectory.name,
      x: traced.path.map((coordinates) => coordinates[0]),
      y: traced.path.map((coordinates) => coordinates[1]),
      z: isThreeDimensional
        ? traced.path.map((coordinates) => coordinates[2])
        : undefined,
    };
    traces.push(trace);
  }

  return traces;
}
