import {useMousePressed, useWindowSize} from '@vueuse/core';
import {type AppDraggableProps} from 'src/app/draggable/app-draggable.vue';
import {useAppDraggableBounds} from 'src/app/draggable/use-app-draggable-bounds';
import {useScatterCamera} from 'src/components/scatter/use-scatter-camera';
import {useDraggables} from 'src/composables/use-draggables';
import {onMounted, type Ref, watch} from 'vue';

interface Props {
  props: AppDraggableProps;
  container: Ref<HTMLElement | null>;
  drag: Ref<HTMLElement | null>;
  x: Ref<number>;
  y: Ref<number>;
}

export function useAppDraggableLifecycles({
  props,
  container,
  drag,
  x,
  y,
}: Props) {
  const {store, open: openDraggable} = useDraggables();
  const {width, height} = useWindowSize();
  const {check} = useAppDraggableBounds(container);
  const {pressed} = useMousePressed({target: drag});
  const {lock, unlock} = useScatterCamera();

  const open = () => {
    if (store[props.draggableKey] === false || window.visualViewport === null) {
      return;
    }

    check(x, y);
  };

  const handleMouseDown = () => {
    if (!pressed.value) {
      unlock();
      return;
    }

    lock();
    openDraggable(props.draggableKey);
  };

  const resize = () => check(x, y);

  watch(store, open);
  watch(pressed, handleMouseDown);
  watch([width, height], resize);
  onMounted(resize);
}
