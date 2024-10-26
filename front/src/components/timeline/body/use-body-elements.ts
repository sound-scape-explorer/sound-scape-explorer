import {
  type TimelineElement,
  useTimelineElements,
} from 'src/components/timeline/use-timeline-elements';
import {useTimelineRange} from 'src/components/timeline/use-timeline-range';
import {ref} from 'vue';

const indices = ref<number[]>([]);
const elements = ref<TimelineElement[]>([]);

export function useBodyElements() {
  const {left, right} = useTimelineRange();
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
