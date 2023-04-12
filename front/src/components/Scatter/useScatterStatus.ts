import {ref, watch} from 'vue';
import {scatterDatasetStore} from './scatterDatasetStore';

export function useScatterStatus() {
  const isDisabled = ref<boolean>(true);

  watch(scatterDatasetStore, () => {
    isDisabled.value = typeof scatterDatasetStore.dataset === 'undefined';
  });

  return {
    isDisabled: isDisabled,
  };
}
