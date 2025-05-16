import {type Scale} from 'chroma-js';
import {type Data} from 'plotly.js-dist-min';
import {type TrajectoryData} from 'src/composables/use-trajectories';
import {TRACE_WIDTH_2D, TRACE_WIDTH_3D} from 'src/constants';
import {interpolateArray, sumArraysIndexWise} from 'src/utils/arrays';
import {getDayOfYear} from 'src/utils/time';
import {getTrajectoryColors} from 'src/utils/trajectories-new';

export function isTrajectory3d(trajectory: TrajectoryData): boolean {
  return trajectory.path[0].length === 3;
}

export function buildAverageTrajectory(trajectories: TrajectoryData[]) {
  const is3d = isTrajectory3d(trajectories[0]);

  interface Coordinates {
    x: number[];
    y: number[];
    z: number[];
  }

  let longestTrajectory: TrajectoryData = trajectories[0];

  const coordinates: Coordinates[] = [];

  // Pick the longest trajectory
  for (const trajectory of trajectories) {
    if (trajectory.path.length > longestTrajectory.path.length) {
      longestTrajectory = trajectory;
    }
  }

  const length = longestTrajectory.path.length;

  // Interpolating
  for (const trajectory of trajectories) {
    const coords = {} as Coordinates;
    coords.x = trajectory.path.map((coords) => coords[0]);
    coords.y = trajectory.path.map((coords) => coords[1]);
    if (is3d) {
      coords.z = trajectory.path.map((coords) => coords[2]);
    }

    if (coords.x.length < length) {
      coords.x = interpolateArray(coords.x, length);
      coords.y = interpolateArray(coords.y, length);
      if (is3d) {
        coords.z = interpolateArray(coords.z, length);
      }
    }

    coordinates.push(coords);
  }

  const data = {
    x: sumArraysIndexWise({
      arrays: coordinates.map((data) => data.x),
      doAveraging: true,
    }),
    y: sumArraysIndexWise({
      arrays: coordinates.map((data) => data.y),
      doAveraging: true,
    }),
    z: is3d
      ? sumArraysIndexWise({
        arrays: coordinates.map((data) => data.z),
        doAveraging: true,
      })
      : undefined,
  };

  return {
    data,
    trajectory: longestTrajectory,
    is3d,
  };
}

// todo: remove me?
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
  trajectories: TrajectoryData[],
  scale: Scale,
) {
  const {data, trajectory, is3d} = buildAverageTrajectory(trajectories);

  const colors = getTrajectoryColors(trajectory, scale);

  // Trace
  const averageTrace: Data = {
    ...generateTraceDefaultDataOptions(is3d, colors),
    name: 'Averaged Trace',
    x: data.x,
    y: data.y,
    z: data.z,
  };

  return averageTrace;
}

export function traceTrajectories(
  trajectories: TrajectoryData[],
  scale: Scale,
) {
  const is3d = isTrajectory3d(trajectories[0]);
  const traces = [];

  for (const trajectory of trajectories) {
    const colors = getTrajectoryColors(trajectory, scale);
    const trace: Data = {
      ...generateTraceDefaultDataOptions(is3d, colors),
      name: trajectory.trajectory.name,
      x: trajectory.path.map((coordinates) => coordinates[0]),
      y: trajectory.path.map((coordinates) => coordinates[1]),
      z: is3d
        ? trajectory.path.map((coordinates) => coordinates[2])
        : undefined,
    };
    traces.push(trace);
  }

  return traces;
}
