import {reactive, watchEffect} from 'vue';
import {pointIndexGroupsRef} from './useScatterTraces';

interface PointIndexesRef {
  value: number[] | null;
}

export const pointIndexesRef = reactive<PointIndexesRef>({
  value: null,
});

export function usePointIndexes() {
  watchEffect(() => {
    if (pointIndexGroupsRef.value === null) {
      pointIndexesRef.value === null;
      return;
    }

    pointIndexesRef.value = pointIndexGroupsRef.value.flat();
  });
}
