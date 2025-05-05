import {useTimelineRange} from 'src/components/timeline/use-timeline-range';
import {useAggregated} from 'src/composables/use-aggregated';
import {useDraggableCalendar} from 'src/draggables/calendar/use-draggable-calendar';
import {ref} from 'vue';

const filtered = ref<boolean[]>([]);

export function useScatterFilterTime() {
  const {aggregated} = useAggregated();
  const {isActive} = useDraggableCalendar();
  const {left, right} = useTimelineRange();

  const isVisible = (index: number): boolean => {
    if (!isActive.value) {
      return true;
    }

    if (aggregated.value === null) {
      return false;
    }

    // Unix time in seconds
    const t = aggregated.value.timestamps[index];
    return t >= left.value && t < right.value;
  };

  const filter = (): void => {
    if (aggregated.value === null) {
      return;
    }

    const length = aggregated.value.timestamps.length;
    const pointsFilteredByTime = new Array<boolean>(length);

    for (let i = 0; i < length; i += 1) {
      const isFiltered = !isVisible(i);
      pointsFilteredByTime[i] = isFiltered;
    }

    filtered.value = pointsFilteredByTime;
  };

  const reset = () => {
    filtered.value = [];
  };

  return {
    filtered,
    filterByTime: filter,
    resetFilterByTime: reset,
  };
}
