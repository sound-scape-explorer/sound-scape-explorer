import {useSelectionState} from 'src/draggables/selection/use-selection-state';
import {ref} from 'vue';

const isActive = ref<boolean>(false); // render into display
const isFiltering = ref<boolean>(false); // filter actual data
const isWireframe = ref<boolean>(true); // render as wireframe

export function useDraggableSelection() {
  const {resetAngles} = useSelectionState();

  const reset = () => {
    if (isActive.value) {
      isActive.value = false;
    }

    if (isFiltering.value) {
      isFiltering.value = false;
    }

    resetAngles();
  };

  return {
    isActive,
    isFiltering,
    isWireframe,
    reset,
  };
}
