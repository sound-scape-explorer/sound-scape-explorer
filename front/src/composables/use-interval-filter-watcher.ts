import {useScatterFilterAcoustic} from 'src/components/scatter/use-scatter-filter-acoustic';
import {useScatterFilterCalendar} from 'src/components/scatter/use-scatter-filter-calendar';
import {useScatterFilterTag} from 'src/components/scatter/use-scatter-filter-tag';
import {useScatterFilterGlobal} from 'src/composables/use-scatter-filter-global';
import {watch} from 'vue';

export function useIntervalFilterWatcher() {
  const {filtered: calendarFiltered} = useScatterFilterCalendar();
  const {filtered: labelFiltered} = useScatterFilterTag();
  const {filtered: acousticFiltered} = useScatterFilterAcoustic();
  const {update} = useScatterFilterGlobal();

  watch([labelFiltered, calendarFiltered, acousticFiltered], update);
}
