import {useCalendarRange} from 'src/components/timeline/use-calendar-range';
import {
  type TimelineElement,
  useTimelineElements,
} from 'src/components/timeline/use-timeline-elements';
import {ref} from 'vue';

const elements = ref<TimelineElement[]>([]);
const indices = ref<number[]>([]);

export function useOverviewElements() {
  const {getCollectedIndices, createElements} = useTimelineElements();
  const {start, end} = useCalendarRange();

  const update = () => {
    indices.value = getCollectedIndices(start, end);
    elements.value = createElements(indices);
  };

  return {
    elements: elements,
    update: update,
  };
}
