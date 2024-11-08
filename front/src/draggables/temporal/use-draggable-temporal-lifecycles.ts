import {useScatterGlobalFilter} from 'src/composables/use-scatter-global-filter';
import {useDraggableTemporal} from 'src/draggables/temporal/use-draggable-temporal';
import {useTemporal} from 'src/draggables/temporal/use-temporal';
import {useTemporalCandles} from 'src/draggables/temporal/use-temporal-candles';
import {useTemporalChart} from 'src/draggables/temporal/use-temporal-chart';
import {watch} from 'vue';

export function useDraggableTemporalLifecycles() {
  const {isCandles, isExpanded} = useDraggableTemporal();
  const {data} = useTemporal();
  const {render} = useTemporalChart();
  const {period} = useTemporalCandles();
  const {filtered} = useScatterGlobalFilter();

  watch([data, isCandles, period, filtered, isExpanded], render);
}
