import {ref, watch} from 'vue';
import {UMAPDatasetStore} from '../store/UMAP-dataset.store';

export function useUMAPStatus() {
  const {dataset} = UMAPDatasetStore;

  const isDisabled = ref<boolean>(true);

  watch(UMAPDatasetStore, () => {
    isDisabled.value = typeof dataset === 'undefined';
  });

  return {
    isDisabled,
  };
}
