import {useTimelineHandlers} from 'src/components/timeline/use-timeline-handlers';
import {useTimelineRangeNames} from 'src/components/timeline/use-timeline-range-names';
import {useStorageRanges} from 'src/composables/use-storage-ranges';
import {onMounted, watch} from 'vue';

export function useTimelineLifecycles() {
  const {ranges} = useStorageRanges();
  const {names, name, updateNames, updateName} = useTimelineRangeNames();
  const {updateRange} = useTimelineHandlers();

  onMounted(updateRange);

  watch(ranges, updateNames);
  watch(names, updateName);
  watch(name, updateRange);
}
