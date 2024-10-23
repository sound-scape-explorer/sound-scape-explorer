import {type TimelineElement} from 'src/draggables/calendar/use-timeline-elements';
import {computed, type Ref, ref} from 'vue';

const config = ref({
  startX: 0,
  startY: 0,
  width: 0,
  rowHeight: 20,
  rows: 10,
});

const time = ref({
  minTime: 0,
  maxTime: 1,
  divisions: 10000,
  every: 10000,
});

export function useTimelineConfig() {
  const height = computed(() => config.value.rows * config.value.rowHeight);

  const refreshWidth = (width: number) => {
    config.value = {
      ...config.value,
      width: width,
    };
  };

  const refreshTime = (elements: Ref<TimelineElement[]>) => {
    const min = Math.min(...elements.value.map((e) => e.start));
    const max = Math.max(...elements.value.map((e) => e.end));

    time.value = {
      ...time.value,
      minTime: min,
      maxTime: max,
    };

    config.value = {
      ...config.value,
      rows: elements.value.length,
    };
  };

  return {
    config: config,
    time: time,
    height: height,
    refreshWidth: refreshWidth,
    refreshTime: refreshTime,
  };
}
