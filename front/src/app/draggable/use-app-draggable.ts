import {useLocalStorage} from '@vueuse/core';
import type {AppDraggableProps} from 'src/app/draggable/app-draggable.vue';
import {ref} from 'vue';

export function useAppDraggable(props: AppDraggableProps) {
  const storageKey = `sse-draggable-${props.draggableKey}`;

  const container = ref<HTMLElement | null>(null);
  const storage = useLocalStorage(storageKey, {x: 100, y: 100});
  const drag = ref<HTMLElement | null>(null);

  return {
    container: container,
    storage: storage,
    drag: drag,
  };
}
