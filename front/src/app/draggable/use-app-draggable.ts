import {useLocalStorage} from '@vueuse/core';
import {type AppDraggableProps} from 'src/app/draggable/app-draggable.vue';
import {useDraggables} from 'src/composables/use-draggables';
import {computed, ref} from 'vue';

export function useAppDraggable(props: AppDraggableProps) {
  const storageKey = `sse-draggable-${props.draggableKey}`;

  const container = ref<HTMLElement | null>(null);
  const storage = useLocalStorage(storageKey, {x: 100, y: 100});
  const drag = ref<HTMLElement | null>(null);

  const {store, stack, hidden} = useDraggables();
  const isZoomed = ref<boolean>(false);
  const isClosed = computed(() => !store[props.draggableKey]);
  const isSelected = computed(() => stack.value[0] === props.draggableKey);

  return {
    container,
    storage,
    drag,
    isZoomed,
    isClosed,
    isSelected,
    hidden,
  };
}
