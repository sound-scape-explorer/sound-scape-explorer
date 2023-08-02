import {groupedTimestampsRef} from 'src/hooks/useStorageGroupedTimestamps';
import {timeStore} from '../Time/timeStore';
import {reactive} from 'vue';
import {pointIndexesRef} from './usePointIndexes';

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

    if (groupedTimestampsRef.value === null) {
      return false;
    }

    // Unix time in seconds
    const timestamp = groupedTimestampsRef.value[index] / 1000;

    const start = timeStore.value;
    const duration = timeStore.duration;
    const end = start + duration;

    return timestamp >= start && timestamp <= end;
  };

  const filterByTime = (): void => {
    if (pointIndexesRef.value === null) {
      return;
    }

    const pointsFilteredByTime = [];

    for (
      let pointIndex = 0;
      pointIndex < pointIndexesRef.value.length;
      ++pointIndex
    ) {
      const isVisible = isVisibleByTime(pointIndex);
      pointsFilteredByTime.push(!isVisible);
    }

    pointsFilteredByTimeRef.value = pointsFilteredByTime;
    console.log('filterByTime');
  };

  return {
    filterByTime: filterByTime,
  };
}
