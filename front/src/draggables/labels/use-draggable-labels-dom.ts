import {TagsDraggableSize} from 'src/constants';
import {useDraggableLabels} from 'src/draggables/labels/use-draggable-labels';
import {computed} from 'vue';

export function useDraggableLabelsDom() {
  const {sizeHorizontal} = useDraggableLabels();

  const cols = computed(() => {
    if (sizeHorizontal.value === TagsDraggableSize.enum.small) {
      return 1;
    }

    return 2;
  });

  return {
    cols,
  };
}
