import {ref} from 'vue';

const isExpanded = ref<boolean>(false);

export function useDraggableRelativeTrajectoriesExpand() {
  const toggle = () => (isExpanded.value = !isExpanded.value);

  return {
    isExpanded: isExpanded,
    toggle: toggle,
  };
}
