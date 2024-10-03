import {type PlotMouseEvent} from 'plotly.js-dist-min';
import {useIntervalSelector} from 'src/draggables/audio/use-interval-selector';

export function useScatterClick() {
  const {selectInterval} = useIntervalSelector();

  const handleClick = (e: PlotMouseEvent) => {
    const intervalIndex = e.points[0].pointNumber;
    selectInterval(intervalIndex);
  };

  return {
    handleClick: handleClick,
  };
}
