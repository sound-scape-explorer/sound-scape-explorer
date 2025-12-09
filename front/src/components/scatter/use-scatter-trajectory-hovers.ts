import {usePlotlyHoverTemplate} from 'src/components/scatter/use-plotly-hover-template';
import {useDateTime} from 'src/composables/use-date-time';
import {type TrajectoryDtoWithData} from 'src/composables/use-trajectories';

interface Hovers {
  text: string[][][];
  template: string;
}

export function useScatterTrajectoryHovers() {
  const {generate: generateTemplate} = usePlotlyHoverTemplate();
  const {timestampToString} = useDateTime();

  const generate = (trajectory: TrajectoryDtoWithData): Hovers => {
    const path = trajectory.path;
    const timestamps = trajectory.timestamps;
    const text = new Array<string[][]>(path.length);

    let hoverLength = -1;

    for (let i = 0; i < path.length; i += 1) {
      const hover: string[][] = [];

      const start = trajectory.trajectory.start;
      const end = trajectory.trajectory.end;
      const t = timestamps[i];

      hover.push(['Name', trajectory.trajectory.name]);
      hover.push(['Tag name', trajectory.trajectory.tagName]);
      hover.push(['Tag value', trajectory.trajectory.tagValue]);
      hover.push(['Start', start]);
      hover.push(['End', end]);
      hover.push(['Path point index', i.toString()]);
      hover.push(['Date', timestampToString(t)]);

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
