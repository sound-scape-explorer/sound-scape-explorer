import {ref} from 'vue';

const isActive = ref<boolean>(false);
const isFiltering = ref<boolean>(false);
const isWireframe = ref<boolean>(true);

export function useDraggableSelection() {
  const reset = () => {
    if (isActive.value) {
      isActive.value = false;
    }

    if (isFiltering.value) {
      isFiltering.value = false;
    }
  };

  return {
    isActive,
    isFiltering,
    isWireframe,
    reset,
  };
}
