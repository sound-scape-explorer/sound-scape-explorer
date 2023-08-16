import {aggregatedTimestampsRef} from 'src/hooks/useAggregatedTimestamps';
import {reactive} from 'vue';

import {timeStore} from '../Time/timeStore';

interface PointsFilteredByTimeRef {
  value: boolean[] | null;
}

export const pointsFilteredByTimeRef = reactive<PointsFilteredByTimeRef>({
  value: null,
});

export function useScatterFilterTime() {
  const isVisibleByTime = (index: number): boolean => {
    if (timeStore.isAllSelected) {
      return true;
    }

    if (aggregatedTimestampsRef.value === null) {
      return false;
    }

    // Unix time in seconds
    const timestamp = aggregatedTimestampsRef.value[index] / 1000;

    const start = timeStore.value;
    const duration = timeStore.duration;
    const end = start + duration;

    return timestamp >= start && timestamp <= end;
  };

  const filterByTime = (): void => {
    if (aggregatedTimestampsRef.value === null) {
      return;
    }

    const pointsFilteredByTime = [];

    for (
      let intervalIndex = 0;
      intervalIndex < aggregatedTimestampsRef.value.length;
      intervalIndex += 1
    ) {
      const isVisible = isVisibleByTime(intervalIndex);
      pointsFilteredByTime.push(!isVisible);
    }

    pointsFilteredByTimeRef.value = pointsFilteredByTime;
    console.log('filterByTime');
  };

  return {
    filterByTime: filterByTime,
  };
}
