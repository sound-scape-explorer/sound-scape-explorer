import {useTimelineHandlers} from 'src/components/timeline/use-timeline-handlers';
import {useTimelineRangeNames} from 'src/components/timeline/use-timeline-range-names';
import {onMounted, watch} from 'vue';

export function useTimelineLifecycles() {
  const {names, name, updateName, updateNames} = useTimelineRangeNames();
  const {updateRange} = useTimelineHandlers();

  onMounted(updateNames);
  onMounted(updateRange);

  watch(names, updateName);
  watch(name, updateRange);
}
