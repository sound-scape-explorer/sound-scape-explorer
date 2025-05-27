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

    let hoverLength = -1;

    for (let i = 0; i < path.length; i += 1) {
      const hover: string[][] = [];

      const start = new Date(trajectory.trajectory.start);
      const end = new Date(trajectory.trajectory.end);
      const date = new Date(timestamps[i]);

      hover.push(['Name', trajectory.trajectory.name]);
      hover.push(['Tag name', trajectory.trajectory.tagName]);
      hover.push(['Tag value', trajectory.trajectory.tagValue]);
      hover.push(['Start', formatDateToString(start)]);
      hover.push(['End', formatDateToString(end)]);
      hover.push(['Path point index', i.toString()]);

      hover.push(['Date', formatDateToString(date)]);

      text[i] = hover;

      if (hover.length > hoverLength) {
        hoverLength = hover.length;
      }
    }

    return {
      text,
      template: generateTemplate(hoverLength),
    };
  };

  return {
    generate,
  };
}
