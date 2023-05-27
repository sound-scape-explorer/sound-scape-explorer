import {groupedTimestampsRef} from 'src/hooks/useStorageGroupedTimestamps';
import {timeStore} from '../Time/timeStore';
import {datasetRef} from './useScatterDataset';
import {reactive} from 'vue';

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

    if (datasetRef.value === null || groupedTimestampsRef.value === null) {
      return false;
    }

    const timestamp = groupedTimestampsRef.value[index] / 1000;

    const start = timeStore.value;
    const duration = timeStore.duration;
    const end = start + duration;

    return timestamp >= start && timestamp <= end;
  };

  const filterByTime = () => {
    if (datasetRef.value === null) {
      return;
    }

    const pointsFilteredByTime = [];

    for (
      let pointIndex = 0;
      pointIndex < datasetRef.value.points.length;
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
