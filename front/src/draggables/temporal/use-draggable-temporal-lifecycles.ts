import {useScatterFilterGlobal} from 'src/composables/use-scatter-filter-global';
import {useDraggableTemporal} from 'src/draggables/temporal/use-draggable-temporal';
import {useTemporalCandles} from 'src/draggables/temporal/use-temporal-candles';
import {useTemporalChart} from 'src/draggables/temporal/use-temporal-chart';
import {useTemporalSeries} from 'src/draggables/temporal/use-temporal-series';
import {useTemporalStrategy} from 'src/draggables/temporal/use-temporal-strategy';
import {watch} from 'vue';

export function useDraggableTemporalLifecycles() {
  const {isCandles, extractorSlug, handleExtractorChange} =
    useDraggableTemporal();
  const {series} = useTemporalSeries();
  const {render} = useTemporalChart();
  const {period} = useTemporalCandles();
  const {filtered} = useScatterFilterGlobal();
  const {strategy} = useTemporalStrategy();

  watch(extractorSlug, handleExtractorChange);
  watch([series, isCandles, period, filtered, strategy], render);
}
