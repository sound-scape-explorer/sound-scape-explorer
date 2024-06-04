import {useStorageAggregatedTimestamps} from 'src/composables/storage-aggregated-timestamps';
import {timeStore} from 'src/draggables/time/time-store';
import {ref} from 'vue';

const filtered = ref<boolean[]>([]);

export function useScatterFilterTime() {
  const {aggregatedTimestamps} = useStorageAggregatedTimestamps();

  const isVisible = (index: number): boolean => {
    if (timeStore.isAllSelected) {
      return true;
    }

    if (aggregatedTimestamps.value === null) {
      return false;
    }

    // Unix time in seconds
    const timestamp = aggregatedTimestamps.value[index] / 1000;

    const start = timeStore.value;
    const duration = timeStore.duration;
    const end = start + duration;

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
