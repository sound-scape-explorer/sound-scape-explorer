import {
  type TimelineElement,
  useTimelineElements,
} from 'src/components/timeline/use-timeline-elements';
import {useTimelineRange} from 'src/components/timeline/use-timeline-range';
import {ref} from 'vue';

const indices = ref<number[]>([]);
const elements = ref<TimelineElement[]>([]);
const elementsByRow = ref<Map<number, TimelineElement[]>>(new Map());

export function useBodyElements() {
  const {start, end} = useTimelineRange();
  const {getCollectedIndices, createElements} = useTimelineElements();

  const update = () => {
    indices.value = getCollectedIndices(start, end);
    elements.value = createElements(indices);

    const rowMap = new Map<number, TimelineElement[]>();

    for (const el of elements.value) {
      let arr = rowMap.get(el.row);

      if (!arr) {
        arr = [];
        rowMap.set(el.row, arr);
      }

      arr.push(el);
    }

    elementsByRow.value = rowMap;
  };

  return {
    elements,
    elementsByRow,
    update,
  };
}
