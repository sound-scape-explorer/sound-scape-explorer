import {type Position} from '@vueuse/core';
import {type Ref} from 'vue';

const defaultPos = 100;

export function useAppDraggableBounds(container: Ref<HTMLElement | null>) {
  const getPrimitives = () => {
    if (container.value === null) {
      throw new Error('Container is null');
    }

    if (window.visualViewport === null) {
      throw new Error('Window viewport is unavailable');
    }

    const width = container.value.clientWidth;
    const height = container.value.clientHeight;
    const maxWidth = window.visualViewport.width;
    const maxHeight = window.visualViewport.height;

    return {
      width: width,
      height: height,
      maxWidth: maxWidth,
      maxHeight: maxHeight,
    };
  };

  const reset = (x: Ref<number>, y: Ref<number>) => {
    x.value = defaultPos;
    y.value = defaultPos;
  };

  const checkEmptyPosition = (x: Ref<number>, y: Ref<number>) => {
    const {width, height, maxWidth, maxHeight} = getPrimitives();

    if (x.value >= maxWidth || x.value + width >= maxWidth) {
      x.value = maxWidth - width;
    }

    if (y.value >= maxHeight || y.value + height >= maxHeight) {
      y.value = maxHeight - height;
    }

    if (x.value <= 0) {
      x.value = 0;
    }

    if (y.value <= 0) {
      y.value = 0;
    }
  };

  const checkPosition = (
    x: Ref<number>,
    y: Ref<number>,
    position: Position,
  ) => {
    const {width, height, maxWidth, maxHeight} = getPrimitives();

    if (position.x >= maxWidth || position.x + width >= maxWidth) {
      x.value = maxWidth - width;
    }

    if (position.y >= maxHeight || position.y + height >= maxHeight) {
      y.value = maxHeight - height;
    }

    if (position.x <= 0) {
      x.value = 0;
    }

    if (position.y <= 0) {
      y.value = 0;
    }
  };

  const check = (x: Ref<number>, y: Ref<number>, position?: Position) => {
    if (window.visualViewport === null || container.value === null) {
      reset(x, y);
      return;
    }

    if (position) {
      checkPosition(x, y, position);
      return;
    }

    checkEmptyPosition(x, y);
  };

  return {
    check: check,
  };
}
