import {
  type TimelineElement,
  useTimelineElements,
} from 'src/components/timeline/use-timeline-elements';
import {useTimelineRange} from 'src/components/timeline/use-timeline-range';
import {ref} from 'vue';

const elements = ref<TimelineElement[]>([]);
const indices = ref<number[]>([]);

export function useOverviewElements() {
  const {getCollectedIndices, createElements} = useTimelineElements();
  const {start, end} = useTimelineRange();

  const update = () => {
    indices.value = getCollectedIndices(start, end);
    elements.value = createElements(indices);
  };

  return {
    elements: elements,
    update: update,
  };
}
