import {useScatterGlobalFilter} from 'src/composables/use-scatter-global-filter';
import {TIMEOUT} from 'src/constants';
import {useDraggableTemporal} from 'src/draggables/temporal/use-draggable-temporal';
import {useTemporal} from 'src/draggables/temporal/use-temporal';
import {useTemporalCandles} from 'src/draggables/temporal/use-temporal-candles';
import {useTemporalChart} from 'src/draggables/temporal/use-temporal-chart';
import {useTemporalSites} from 'src/draggables/temporal/use-temporal-sites';
import {watch} from 'vue';

let t: null | number = null;

export function useDraggableTemporalLifecycles() {
  const {indicator, isScatter, isCandles, isExpanded} = useDraggableTemporal();
  const {data: indicatorData} = useTemporal();
  const {render} = useTemporalChart();
  const {period} = useTemporalCandles();
  const {current: currentSites, handleFirstLoad} = useTemporalSites();
  const {filtered} = useScatterGlobalFilter();

  watch(
    [
      // currentIndicator, // redundant with below entry
      indicatorData,
      currentSites,
      isScatter,
      isCandles,
      period,
      filtered,
      isExpanded,
    ],
    () => {
      if (t) {
        clearTimeout(t);
        t = null;
      }

      t = setTimeout(render, TIMEOUT);
    },
  );

  watch(indicator, handleFirstLoad);
}
