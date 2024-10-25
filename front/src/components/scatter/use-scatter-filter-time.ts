import {useCalendarRange} from 'src/components/timeline/use-calendar-range';
import {useStorageAggregatedTimestamps} from 'src/composables/use-storage-aggregated-timestamps';
import {useDraggableCalendar} from 'src/draggables/calendar/use-draggable-calendar';
import {ref} from 'vue';

const filtered = ref<boolean[]>([]);

export function useScatterFilterTime() {
  const {aggregatedTimestamps} = useStorageAggregatedTimestamps();
  const {isActive} = useDraggableCalendar();
  const {left, right} = useCalendarRange();

  const isVisible = (index: number): boolean => {
    if (!isActive.value) {
      return true;
    }

    if (aggregatedTimestamps.value === null) {
      return false;
    }

    // Unix time in seconds
    const t = aggregatedTimestamps.value[index];
    return t >= left.value && t < right.value;
  };

  const filter = (): void => {
    if (aggregatedTimestamps.value === null) {
      return;
    }

    const length = aggregatedTimestamps.value.length;
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
    filtered: filtered,
    filterByTime: filter,
    resetFilterByTime: reset,
  };
}
