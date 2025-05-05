import {ref} from 'vue';

const isExpanded = ref<boolean>(false);

export function useDraggableCalendarExpand() {
  const toggle = () => (isExpanded.value = !isExpanded.value);

  return {
    isExpanded,
    toggle,
  };
}
