import {ref} from 'vue';

const isExpanded = ref<boolean>(false);
const columns = ref<number>(1);

export function useDraggableLabels() {
  const expand = () => (isExpanded.value = true);
  const shrink = () => (isExpanded.value = false);
  const toggleExpand = () => (isExpanded.value = !isExpanded.value);

  const toggleColumns = () => {
    if (columns.value === 1) {
      columns.value = 2;
      return;
    }

    columns.value = 1;
  };
  return {
    isExpanded: isExpanded,
    expand: expand,
    shrink: shrink,
    toggleExpand: toggleExpand,
    columns: columns,
    toggleColumns: toggleColumns,
  };
}
