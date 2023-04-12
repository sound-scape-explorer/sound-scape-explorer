import {computed} from 'vue';
import {selectionStore} from './selectionStore';

export function useSelection() {
  function clearSelection() {
    selectionStore.band = null;
    selectionStore.integration = null;
  }

  const isActive = computed(() => selectionStore.band !== null && selectionStore.integration !== null);

  return {
    clearSelection: clearSelection,
    isActive: isActive,
  };
}
