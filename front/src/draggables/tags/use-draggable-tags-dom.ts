import {TagsDraggableSize} from 'src/constants';
import {useDraggableTags} from 'src/draggables/tags/use-draggable-tags';
import {computed} from 'vue';

export function useDraggableTagsDom() {
  const {sizeHorizontal} = useDraggableTags();

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
