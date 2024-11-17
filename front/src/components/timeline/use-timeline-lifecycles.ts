import {useTimelineHandlers} from 'src/components/timeline/use-timeline-handlers';
import {useTimelineOptions} from 'src/components/timeline/use-timeline-options';
import {onMounted, watch} from 'vue';

export function useTimelineLifecycles() {
  const {names, name} = useTimelineOptions();
  const {updateName, updateRange} = useTimelineHandlers();

  onMounted(updateRange);
  watch(name, updateRange);
  watch(names, updateName);
}
