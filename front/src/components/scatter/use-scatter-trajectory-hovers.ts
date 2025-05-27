import {formatDateToString} from '@shared/dates';
import {usePlotlyHoverTemplate} from 'src/components/scatter/use-plotly-hover-template';
import {type TrajectoryDtoWithData} from 'src/composables/use-trajectories';

interface Hovers {
  text: string[][][];
  template: string;
}

export function useScatterTrajectoryHovers() {
  const {generate: generateTemplate} = usePlotlyHoverTemplate();

  const generate = (trajectory: TrajectoryDtoWithData): Hovers => {
    const path = trajectory.path;
    const timestamps = trajectory.timestamps;
    const text = new Array<string[][]>(path.length);

    for (let i = 0; i < path.length; i += 1) {
      const hover: string[][] = [];

      hover.push(['Name', trajectory.trajectory.name]);
      hover.push(['Tag name', trajectory.trajectory.tagName]);
      hover.push(['Tag value', trajectory.trajectory.tagValue]);
      hover.push(['Path point index', i.toString()]);

      const date = new Date(timestamps[i]);
      hover.push(['Date', formatDateToString(date)]);

      text[i] = hover;
    }

    return {
      text,
      template: generateTemplate(5),
    };
  };

  return {
    generate,
  };
}
