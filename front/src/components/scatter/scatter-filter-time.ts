import {useStorageAggregatedTimestamps} from 'src/composables/storage-aggregated-timestamps';
import {useDraggableTime} from 'src/draggables/time/draggable-time';
import {ref} from 'vue';

const filtered = ref<boolean[]>([]);

export function useScatterFilterTime() {
  const {aggregatedTimestamps} = useStorageAggregatedTimestamps();
  const {isAllSelected, current, duration} = useDraggableTime();

  const isVisible = (index: number): boolean => {
    if (isAllSelected.value) {
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
