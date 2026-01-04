import {
  type PlotData,
  type PlotDatum,
  type PlotMouseEvent,
} from 'plotly.js-dist-min';
import {useIntervalTransport} from 'src/composables/use-interval-transport';

interface MyPlotDatum extends Omit<PlotDatum, 'data'> {
  data: PlotData;
}

export function useScatterClick() {
  const {selectInterval} = useIntervalTransport();

  const handleClick = (e: PlotMouseEvent) => {
    const point: MyPlotDatum = e.points[0] as unknown as MyPlotDatum;
    const isMarker = point.data.mode === 'markers';

    if (!isMarker) {
      return;
    }

    selectInterval(point.pointNumber); // interval index
  };

  return {
    handleClick,
  };
}
