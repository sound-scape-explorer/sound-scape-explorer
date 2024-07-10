import {useScatterFilterLabels} from 'src/components/scatter/use-scatter-filter-labels';
import {useScatterFilterTemporal} from 'src/components/scatter/use-scatter-filter-temporal';
import {useScatterFilterTime} from 'src/components/scatter/use-scatter-filter-time';
import {useIntervalFilter} from 'src/composables/use-interval-filter';
import {watch} from 'vue';

export function useIntervalFilterWatcher() {
  const {filtered: timeFiltered} = useScatterFilterTime();
  const {filtered: labelFiltered} = useScatterFilterLabels();
  const {filtered: temporalFiltered} = useScatterFilterTemporal();
  const {update} = useIntervalFilter();

  watch([labelFiltered, timeFiltered, temporalFiltered], update);
}
