import {useStorageAggregatedTimestamps} from 'src/composables/storage-aggregated-timestamps';
import {reactive} from 'vue';

import {timeStore} from '../Time/timeStore';
import {useScatterTraces} from './useScatterTraces';

interface PointsFilteredByTimeRef {
  value: boolean[] | null;
}

export const pointsFilteredByTimeRef = reactive<PointsFilteredByTimeRef>({
  value: null,
});

export function useScatterFilterTime() {
  const {aggregatedTimestamps} = useStorageAggregatedTimestamps();

  const isVisibleByTime = (index: number): boolean => {
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

  const {renderTraces} = useScatterTraces();

  const filterByTime = (): void => {
    if (aggregatedTimestamps.value === null) {
      return;
    }

    const pointsFilteredByTime = [];

    for (
      let intervalIndex = 0;
      intervalIndex < aggregatedTimestamps.value.length;
      intervalIndex += 1
    ) {
      const isVisible = isVisibleByTime(intervalIndex);
      pointsFilteredByTime.push(!isVisible);
    }

    pointsFilteredByTimeRef.value = pointsFilteredByTime;
    renderTraces();
  };

  const resetFilterByTime = () => {
    pointsFilteredByTimeRef.value = null;
  };

  return {
    filterByTime: filterByTime,
    resetFilterByTime: resetFilterByTime,
  };
}
