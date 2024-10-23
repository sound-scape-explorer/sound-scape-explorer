import {type TimelineElement} from 'src/components/timeline/body/use-body-elements';
import {type Ref, ref} from 'vue';

const config = ref({
  startX: 0,
  startY: 0,
  rowHeight: 12,
});

const time = ref({
  minTime: 0,
  maxTime: 1,
  divisions: 10000,
  every: 10000,
});

const elementGaps = {top: 2, bottom: 4};
const rows = ref<number>(10);

export function useBodyConfig() {
  const refreshTime = (elements: Ref<TimelineElement[]>) => {
    const min = Math.min(...elements.value.map((e) => e.start));
    const max = Math.max(...elements.value.map((e) => e.end));

    time.value = {
      ...time.value,
      minTime: min,
      maxTime: max,
    };

    rows.value = elements.value.length;
  };

  return {
    rows: rows,
    config: config,
    time: time,
    refreshTime: refreshTime,
    elementGaps: elementGaps,
  };
}
