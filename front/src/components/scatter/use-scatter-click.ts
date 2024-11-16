import {
  type PlotData,
  type PlotDatum,
  type PlotMouseEvent,
} from 'plotly.js-dist-min';
import {useClientSettings} from 'src/composables/use-client-settings';
import {useDraggables} from 'src/composables/use-draggables';
import {useIntervalSelector} from 'src/composables/use-interval-selector';

// @warn auto-completion does not work on intellij 2024.2.3
// @see https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/plotly.js/index.d.ts
// @see https://raw.githubusercontent.com/DefinitelyTyped/DefinitelyTyped/refs/heads/master/types/plotly.js/index.d.ts
interface MyPlotDatum extends Omit<PlotDatum, 'data'> {
  data: PlotData;
}

export function useScatterClick() {
  const {selectInterval} = useIntervalSelector();
  const {open} = useDraggables();
  const {isDetailsAutoOpen, isAudioAutoOpen} = useClientSettings();

  const handleClick = (e: PlotMouseEvent) => {
    const point: MyPlotDatum = e.points[0] as unknown as MyPlotDatum;
    const isMarker = point.data.mode === 'markers';

    if (!isMarker) {
      return;
    }

    selectInterval(point.pointNumber); // interval index

    if (isDetailsAutoOpen.value) {
      open('details');
    }

    if (isAudioAutoOpen.value) {
      open('audio');
    }
  };

  return {
    handleClick: handleClick,
  };
}
