import {type Scale} from 'chroma-js';
import {type Data} from 'plotly.js-dist-min';
import {useScatterTrajectoryColors} from 'src/components/scatter/use-scatter-trajectory-colors';
import {useScatterTrajectoryHovers} from 'src/components/scatter/use-scatter-trajectory-hovers';
import {useScatterTrajectoryUtils} from 'src/components/scatter/use-scatter-trajectory-utils';
import {type TrajectoryDtoWithData} from 'src/composables/use-trajectories';
import {interpolateArray, sumArraysIndexWise} from 'src/utils/arrays';

export function useScatterTrajectoryAverage() {
  const {getDefaultScatterOptions, isTrajectory3d} =
    useScatterTrajectoryUtils();
  const {getColors} = useScatterTrajectoryColors();
  const {generate: generateHovers} = useScatterTrajectoryHovers();

  const build = (trajectories: TrajectoryDtoWithData[]) => {
    const is3d = isTrajectory3d(trajectories[0]);

    interface Coordinates {
      x: number[];
      y: number[];
      z: number[];
    }

    let longestTrajectory: TrajectoryDtoWithData = trajectories[0];

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
  };

  const render = (trajectories: TrajectoryDtoWithData[], scale: Scale) => {
    const {data, trajectory, is3d} = build(trajectories);

    const renamedTrajectory: TrajectoryDtoWithData = {
      ...trajectory,
      trajectory: {
        ...trajectory.trajectory,
        name: 'Trajectory average',
        tagName: 'N/A',
        tagValue: 'N/A',
      },
    };

    const colors = getColors(renamedTrajectory, scale);
    const hovers = generateHovers(renamedTrajectory);

    const rendered: Data = {
      ...getDefaultScatterOptions(is3d, colors),
      name: '',
      text: hovers.text as unknown as string[],
      hovertemplate: hovers.template,
      x: data.x,
      y: data.y,
      z: data.z,
    };

    return rendered;
  };

  return {
    build,
    render,
  };
}
