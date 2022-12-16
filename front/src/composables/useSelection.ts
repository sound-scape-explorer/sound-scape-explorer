import {selectionImageStore} from '../store/selection-image.store';
import {selectionStore} from '../store/selection.store';
import {computed} from 'vue';

export function useSelection() {
  function clearSelection() {
    selectionImageStore.image = null;
    selectionStore.band = null;
    selectionStore.interval = null;
  }

  const isActive = computed(() => selectionStore.band !== null && selectionStore.interval !== null);

  return {
    clearSelection,
    isActive,
  };
}
