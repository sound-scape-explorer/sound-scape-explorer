import type {AppDraggableProps} from 'src/app/draggable/app-draggable.vue';
import {useDraggables} from 'src/composables/use-draggables';
import {computed, ref} from 'vue';

export function useAppDraggableStyles(props: AppDraggableProps) {
  const {store, selected} = useDraggables();
  const isZoomed = ref<boolean>(false);

  const classes = computed<string>(() => {
    let string = 'draggable';

    if (isZoomed.value === true) {
      string += ' zoomed';
    }

    if (!store[props.draggableKey]) {
      string += ' closed';
    }

    if (selected.value === props.draggableKey) {
      string += ' selected';
    }

    return string;
  });

  return {
    classes: classes,
  };
}
