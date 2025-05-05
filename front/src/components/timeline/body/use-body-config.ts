import {type TimelineElement} from 'src/components/timeline/use-timeline-elements';
import {type Ref, ref} from 'vue';

const rowMin = 5;
const rowHeight = 18;
const rows = ref<number>(rowMin); // count

const elementGaps = {top: 2, bottom: 4};

export function useBodyConfig() {
  const refreshRows = (elements: Ref<TimelineElement[]>) => {
    let r = Array.from(new Set([...elements.value.map((e) => e.row)])).length;

    if (r < rowMin) {
      r = rowMin;
    }

    rows.value = r;
  };

  return {
    rows,
    rowHeight,
    refreshRows,
    elementGaps,
  };
}
