import {ref} from 'vue';

const isZoomed = ref<boolean>(false);
const columns = ref<number>(1);

export function useDraggableLabel() {
  const zoom = () => (isZoomed.value = true);
  const unzoom = () => (isZoomed.value = false);
  const toggleZoom = () => (isZoomed.value = !isZoomed.value);

  const toggleColumns = () => {
    if (columns.value === 1) {
      columns.value = 2;
      return;
    }

    columns.value = 1;
  };
  return {
    isZoomed: isZoomed,
    zoom: zoom,
    unzoom: unzoom,
    toggleZoom: toggleZoom,
    columns: columns,
    toggleColumns: toggleColumns,
  };
}
