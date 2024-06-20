import {useScatterFilterLabel} from 'src/components/scatter/scatter-filter-label';
import {useScatterFilterTime} from 'src/components/scatter/scatter-filter-time';
import {useIntervalFilter} from 'src/composables/interval-filter';
import {watch} from 'vue';

export function useIntervalFilterWatcher() {
  const {filtered: timeFiltered} = useScatterFilterTime();
  const {filtered: labelFiltered} = useScatterFilterLabel();
  const {update} = useIntervalFilter();

  watch([labelFiltered, timeFiltered], update);
}
