import {ref} from 'vue';

const isActive = ref<boolean>(false);
const isFiltering = ref<boolean>(false);
const isWireframe = ref<boolean>(true);

export function useDraggableSelection() {
  return {
    isActive,
    isFiltering,
    isWireframe,
  };
}
