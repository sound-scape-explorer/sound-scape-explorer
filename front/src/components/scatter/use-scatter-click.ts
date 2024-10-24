import {
  type PlotData,
  type PlotDatum,
  type PlotMouseEvent,
} from 'plotly.js-dist-min';
import {useIntervalSelector} from 'src/draggables/audio/use-interval-selector';

// @warn auto-completion does not work on intellij 2024.2.3
// @see https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/plotly.js/index.d.ts
// @see https://raw.githubusercontent.com/DefinitelyTyped/DefinitelyTyped/refs/heads/master/types/plotly.js/index.d.ts
interface MyPlotDatum extends Omit<PlotDatum, 'data'> {
  data: PlotData;
}

export function useScatterClick() {
  const {selectInterval} = useIntervalSelector();

  const handleClick = (e: PlotMouseEvent) => {
    const point: MyPlotDatum = e.points[0] as unknown as MyPlotDatum;
    const isMarker = point.data.mode === 'markers';

    if (!isMarker) {
      return;
    }

    selectInterval(point.pointNumber); // interval index
  };

  return {
    handleClick: handleClick,
  };
}
