import {useScatterFilterTag} from 'src/components/scatter/use-scatter-filter-tag';
import {useScatterFilterTemporal} from 'src/components/scatter/use-scatter-filter-temporal';
import {useScatterFilterTime} from 'src/components/scatter/use-scatter-filter-time';
import {useScatterGlobalFilter} from 'src/composables/use-scatter-global-filter';
import {watch} from 'vue';

export function useIntervalFilterWatcher() {
  const {filtered: timeFiltered} = useScatterFilterTime();
  const {filtered: labelFiltered} = useScatterFilterTag();
  const {filtered: temporalFiltered} = useScatterFilterTemporal();
  const {update} = useScatterGlobalFilter();

  watch([labelFiltered, timeFiltered, temporalFiltered], update);
}
