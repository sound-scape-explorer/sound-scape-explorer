import {useCalendarRange} from 'src/components/timeline/use-calendar-range';
import {
  type TimelineElement,
  useTimelineElements,
} from 'src/components/timeline/use-timeline-elements';
import {ref} from 'vue';

const indices = ref<number[]>([]);
const elements = ref<TimelineElement[]>([]);

export function useBodyElements() {
  const {left, right} = useCalendarRange();
  const {getCollectedIndices, createElements} = useTimelineElements();

  const update = () => {
    indices.value = getCollectedIndices(left, right);
    elements.value = createElements(indices);
  };

  return {
    elements: elements,
    update: update,
  };
}
