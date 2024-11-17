import {useTimelineHandlers} from 'src/components/timeline/use-timeline-handlers';
import {useTimelineOptions} from 'src/components/timeline/use-timeline-options';
import {useStorageRanges} from 'src/composables/use-storage-ranges';
import {onMounted, watch} from 'vue';

export function useTimelineLifecycles() {
  const {ranges} = useStorageRanges();
  const {names, name, updateNames} = useTimelineOptions();
  const {updateName, updateRange} = useTimelineHandlers();

  onMounted(updateRange);

  watch(ranges, updateNames);
  watch(names, updateName);
  watch(name, updateRange);
}
