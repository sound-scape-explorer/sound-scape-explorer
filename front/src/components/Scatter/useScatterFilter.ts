import {reactive, watch} from 'vue';
import {pointsFilteredByTimeRef} from './useScatterFilterTime';
import {pointsFilteredByMetaRef} from './useScatterFilterMeta';

interface PointsFilteredRef {
  value: boolean[] | null;
}

export const pointsFilteredRef = reactive<PointsFilteredRef>({
  value: null,
});

export function useScatterFilter() {
  watch([pointsFilteredByTimeRef, pointsFilteredByMetaRef], () => {
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
  });
}
