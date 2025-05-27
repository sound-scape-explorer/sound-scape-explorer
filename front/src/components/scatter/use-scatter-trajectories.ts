import {type Scale} from 'chroma-js';
import {type Data} from 'plotly.js-dist-min';
import {useScatterTrajectoryColors} from 'src/components/scatter/use-scatter-trajectory-colors';
import {useScatterTrajectoryHovers} from 'src/components/scatter/use-scatter-trajectory-hovers';
import {useScatterTrajectoryUtils} from 'src/components/scatter/use-scatter-trajectory-utils';
import {type TrajectoryDtoWithData} from 'src/composables/use-trajectories';

export function useScatterTrajectories() {
  const {isTrajectory3d, getDefaultScatterOptions} =
    useScatterTrajectoryUtils();
  const {getColors} = useScatterTrajectoryColors();
  const {generate: generateHovers} = useScatterTrajectoryHovers();

  const render = (trajectories: TrajectoryDtoWithData[], scale: Scale) => {
    const is3d = isTrajectory3d(trajectories[0]);
    const paths = [];

    for (const trajectory of trajectories) {
      const colors = getColors(trajectory, scale);
      const hovers = generateHovers(trajectory);

      const path: Data = {
        ...getDefaultScatterOptions(is3d, colors),
        name: '',
        text: hovers.text as unknown as string[],
        hovertemplate: hovers.template,
        x: trajectory.path.map((coordinates) => coordinates[0]),
        y: trajectory.path.map((coordinates) => coordinates[1]),
        z: is3d
          ? trajectory.path.map((coordinates) => coordinates[2])
          : undefined,
      };

      paths.push(path);
    }

    return paths;
  };

  return {
    render,
  };
}
