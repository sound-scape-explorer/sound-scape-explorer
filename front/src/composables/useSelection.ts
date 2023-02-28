import {computed} from 'vue';
import {selectionImageStore} from '../store/selection-image.store';
import {selectionStore} from '../store/selection.store';

export function useSelection() {
  function clearSelection() {
    selectionImageStore.image = null;
    selectionStore.band = null;
    selectionStore.umapName = null;
  }

  const isActive = computed(() => selectionStore.band !== null && selectionStore.umapName !== null);

  return {
    clearSelection,
    isActive,
  };
}
