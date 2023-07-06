import {reactive, watchEffect} from 'vue';
import {pointsFilteredByTimeRef} from './useScatterFilterTime';
import {pointsFilteredByMetaRef} from './useScatterFilterMeta';

interface PointsFilteredRef {
  value: boolean[] | null;
}

export const pointsFilteredRef = reactive<PointsFilteredRef>({
  value: null,
});

export function useScatterFilter() {
  const readScatterFilter = () => {
    if (
      pointsFilteredByTimeRef.value === null ||
      pointsFilteredByMetaRef.value === null
    ) {
      return;
    }

    const pointsFiltered = [];

    for (
      let pointIndex = 0;
      pointIndex < pointsFilteredByTimeRef.value.length;
      ++pointIndex
    ) {
      const isFilteredByTime = pointsFilteredByTimeRef.value[pointIndex];
      const isFilteredByMeta = pointsFilteredByMetaRef.value[pointIndex];

      const isFiltered = isFilteredByTime || isFilteredByMeta;

      if (isFiltered) {
        pointsFiltered.push(true);
        continue;
      }

      pointsFiltered.push(false);
    }

    pointsFilteredRef.value = pointsFiltered;
  };

  watchEffect(readScatterFilter);
}
