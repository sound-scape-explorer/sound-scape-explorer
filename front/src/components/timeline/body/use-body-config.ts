import {type TimelineElement} from 'src/components/timeline/use-timeline-elements';
import {type Ref, ref} from 'vue';

const rowMin = 5;
const rowHeight = 18;
const rows = ref<number>(rowMin);

const elementGaps = {top: 2, bottom: 4};

export function useBodyConfig() {
  const refreshRows = (elements: Ref<TimelineElement[]>) => {
    let max = -1;

    for (const e of elements.value) {
      if (e.row > max) {
        max = e.row;
      }
    }

    const r = max + 1;
    rows.value = r < rowMin ? rowMin : r;
  };

  return {
    rows,
    rowHeight,
    refreshRows,
    elementGaps,
  };
}
