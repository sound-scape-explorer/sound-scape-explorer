import {reactive, watchEffect} from 'vue';
import {pointIndexesRef} from './usePointIndexes';
import {scatterLoadingRef} from './useScatterLoading';

interface ScatterReadyRef {
  value: boolean;
}

export const scatterReadyRef = reactive<ScatterReadyRef>({
  value: false,
});

export function useScatterReady() {
  watchEffect(() => {
    if (pointIndexesRef.value === null) {
      scatterReadyRef.value = false;
      return;
    }

    scatterReadyRef.value = true;
    scatterLoadingRef.value = false;
  });
}
