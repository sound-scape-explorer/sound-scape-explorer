import {useStorageAggregatedTimestamps} from 'src/composables/use-storage-aggregated-timestamps';
import {useDraggableCalendar} from 'src/draggables/calendar/use-draggable-calendar';
import {ref} from 'vue';

const filtered = ref<boolean[]>([]);

// todo: rename time to calendar?
export function useScatterFilterTime() {
  const {aggregatedTimestamps} = useStorageAggregatedTimestamps();
  const {isActive, current, duration} = useDraggableCalendar();

  const isVisible = (index: number): boolean => {
    if (!isActive.value) {
      return true;
    }

    if (aggregatedTimestamps.value === null) {
      return false;
    }

    // Unix time in seconds
    const timestamp = aggregatedTimestamps.value[index] / 1000;

    const start = current.value;
    const end = start + duration.value;

    return timestamp >= start && timestamp <= end;
  };

  const filter = (): void => {
    if (aggregatedTimestamps.value === null) {
      return;
    }

    const pointsFilteredByTime = [];

    for (
      let intervalIndex = 0;
      intervalIndex < aggregatedTimestamps.value.length;
      intervalIndex += 1
    ) {
      const isFiltered = !isVisible(intervalIndex);
      pointsFilteredByTime.push(isFiltered);
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
