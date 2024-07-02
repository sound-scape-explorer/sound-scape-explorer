import {useScatterFilterLabel} from 'src/components/scatter/use-scatter-filter-label';
import {useScatterFilterTemporal} from 'src/components/scatter/use-scatter-filter-temporal';
import {useScatterFilterTime} from 'src/components/scatter/use-scatter-filter-time';
import {useIntervalFilter} from 'src/composables/use-interval-filter';
import {watch} from 'vue';

export function useIntervalFilterWatcher() {
  const {filtered: timeFiltered} = useScatterFilterTime();
  const {filtered: labelFiltered} = useScatterFilterLabel();
  const {filtered: temporalFiltered} = useScatterFilterTemporal();
  const {update} = useIntervalFilter();

  watch([labelFiltered, timeFiltered, temporalFiltered], update);
}
