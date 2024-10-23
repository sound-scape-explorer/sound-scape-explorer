import {type TimelineElement} from 'src/components/timeline/body/use-body-elements';
import {useCalendarRange} from 'src/components/timeline/use-calendar-range';
import {type Ref, ref} from 'vue';

const config = ref({
  startX: 0,
  startY: 0,
  rowHeight: 18,
});

const time = ref({
  minTime: 0,
  maxTime: 1,
  divisions: 10000,
  every: 10000,
});

const rowMin = 5;

const elementGaps = {top: 2, bottom: 4};
const rows = ref<number>(rowMin);

export function useBodyConfig() {
  const {left, right} = useCalendarRange();

  const refreshTime = (elements: Ref<TimelineElement[]>) => {
    time.value = {
      ...time.value,
      minTime: left.value,
      maxTime: right.value,
    };

    let r = Array.from(new Set([...elements.value.map((e) => e.row)])).length;

    if (r < rowMin) {
      r = rowMin;
    }

    rows.value = r;
  };

  return {
    rows: rows,
    config: config,
    time: time,
    refreshTime: refreshTime,
    elementGaps: elementGaps,
  };
}
