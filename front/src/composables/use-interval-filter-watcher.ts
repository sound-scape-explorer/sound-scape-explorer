import {useScatterFilterLabel} from 'src/components/scatter/use-scatter-filter-label';
import {useScatterFilterTime} from 'src/components/scatter/use-scatter-filter-time';
import {useIntervalFilter} from 'src/composables/use-interval-filter';
import {watch} from 'vue';

export function useIntervalFilterWatcher() {
  const {filtered: timeFiltered} = useScatterFilterTime();
  const {filtered: labelFiltered} = useScatterFilterLabel();
  const {update} = useIntervalFilter();

  watch([labelFiltered, timeFiltered], update);
}
