import {useScatterGlobalFilter} from 'src/composables/use-scatter-global-filter';
import {useDraggableTemporal} from 'src/draggables/temporal/use-draggable-temporal';
import {useTemporalCandles} from 'src/draggables/temporal/use-temporal-candles';
import {useTemporalChart} from 'src/draggables/temporal/use-temporal-chart';
import {useTemporalData} from 'src/draggables/temporal/use-temporal-data';
import {useTemporalStrategy} from 'src/draggables/temporal/use-temporal-strategy';
import {watch} from 'vue';

export function useDraggableTemporalLifecycles() {
  const {isCandles, extractorSlug, handleExtractorChange} =
    useDraggableTemporal();
  const {data} = useTemporalData();
  const {render} = useTemporalChart();
  const {period} = useTemporalCandles();
  const {filtered} = useScatterGlobalFilter();
  const {strategy} = useTemporalStrategy();

  watch(extractorSlug, handleExtractorChange);
  watch([data, isCandles, period, filtered, strategy], render);
}
