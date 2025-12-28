import {useScatterFilterAcoustic} from 'src/components/scatter/use-scatter-filter-acoustic';
import {useScatterFilterCalendar} from 'src/components/scatter/use-scatter-filter-calendar';
import {useScatterFilterTag} from 'src/components/scatter/use-scatter-filter-tag';
import {useScatterGlobalFilter} from 'src/composables/use-scatter-global-filter';
import {watch} from 'vue';

export function useIntervalFilterWatcher() {
  const {filtered: calendarFiltered} = useScatterFilterCalendar();
  const {filtered: labelFiltered} = useScatterFilterTag();
  const {filtered: acousticFiltered} = useScatterFilterAcoustic();
  const {update} = useScatterGlobalFilter();

  watch([labelFiltered, calendarFiltered, acousticFiltered], update);
}
