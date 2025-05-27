import {type Scale} from 'chroma-js';
import {type Data} from 'plotly.js-dist-min';
import {useScatterTrajectoryColors} from 'src/components/scatter/use-scatter-trajectory-colors';
import {useScatterTrajectoryUtils} from 'src/components/scatter/use-scatter-trajectory-utils';
import {type TrajectoryDtoWithData} from 'src/composables/use-trajectories';

export function useScatterTrajectories() {
  const {isTrajectory3d, getDefaultScatterOptions} =
    useScatterTrajectoryUtils();
  const {getColors} = useScatterTrajectoryColors();

  const render = (trajectories: TrajectoryDtoWithData[], scale: Scale) => {
    const is3d = isTrajectory3d(trajectories[0]);
    const traces = [];

    for (const trajectory of trajectories) {
      const colors = getColors(trajectory, scale);
      const trace: Data = {
        ...getDefaultScatterOptions(is3d, colors),
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
  };

  return {
    render,
  };
}
