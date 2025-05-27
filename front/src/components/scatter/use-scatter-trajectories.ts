import {formatDateToString} from '@shared/dates';
import {type Scale} from 'chroma-js';
import {type Data} from 'plotly.js-dist-min';
import {usePlotlyHoverTemplate} from 'src/components/scatter/use-plotly-hover-template';
import {useScatterTrajectoryColors} from 'src/components/scatter/use-scatter-trajectory-colors';
import {useScatterTrajectoryUtils} from 'src/components/scatter/use-scatter-trajectory-utils';
import {type TrajectoryDtoWithData} from 'src/composables/use-trajectories';

export function useScatterTrajectories() {
  const {isTrajectory3d, getDefaultScatterOptions} =
    useScatterTrajectoryUtils();
  const {getColors} = useScatterTrajectoryColors();
  const {generate} = usePlotlyHoverTemplate();

  const generateHovers = (trajectory: TrajectoryDtoWithData): string[][][] => {
    const path = trajectory.path;
    const timestamps = trajectory.timestamps;
    const hovers = new Array<string[][]>(path.length);

    for (let i = 0; i < path.length; i += 1) {
      const hover: string[][] = [];

      hover.push(['Name', trajectory.trajectory.name]);
      hover.push(['Tag name', trajectory.trajectory.tagName]);
      hover.push(['Tag value', trajectory.trajectory.tagValue]);
      hover.push(['Path point index', i.toString()]);

      const date = new Date(timestamps[i]);
      hover.push(['Date', formatDateToString(date)]);

      hovers[i] = hover;
    }

    return hovers;
  };

  const render = (trajectories: TrajectoryDtoWithData[], scale: Scale) => {
    const is3d = isTrajectory3d(trajectories[0]);
    const paths = [];

    for (const trajectory of trajectories) {
      const colors = getColors(trajectory, scale);

      const path: Data = {
        ...getDefaultScatterOptions(is3d, colors),
        name: '',
        text: generateHovers(trajectory) as unknown as string[],
        hovertemplate: generate(5),
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
