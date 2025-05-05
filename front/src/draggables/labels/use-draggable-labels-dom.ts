import {useDraggableLabels} from 'src/draggables/labels/use-draggable-labels';
import {computed} from 'vue';

export function useDraggableLabelsDom() {
  const {sizeHorizontal} = useDraggableLabels();

  const cols = computed(() => {
    if (sizeHorizontal.value === 'big' || sizeHorizontal.value === 'max') {
      return 2;
    }

    return 1;
  });

  return {
    cols,
  };
}
