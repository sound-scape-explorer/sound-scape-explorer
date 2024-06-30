import {type Position} from '@vueuse/core';
import type {Ref} from 'vue';

const defaultPos = 100;

export function useAppDraggableBounds(container: Ref<HTMLElement | null>) {
  const check = (x: Ref<number>, y: Ref<number>, position?: Position) => {
    if (window.visualViewport === null || container.value === null) {
      x.value = defaultPos;
      y.value = defaultPos;
      return;
    }

    const w = container.value.clientWidth;
    const h = container.value.clientHeight;
    const maxWidth = window.visualViewport.width;
    const maxHeight = window.visualViewport.height;

    if (position) {
      if (position.x >= maxWidth || position.x + w >= maxWidth) {
        x.value = maxWidth - w;
      }

      if (position.y >= maxHeight || position.y + h >= maxHeight) {
        y.value = maxHeight - h;
      }

      if (position.x <= 0) {
        x.value = 0;
      }

      if (position.y <= 0) {
        y.value = 0;
      }

      return;
    }

    if (x.value >= maxWidth || x.value + w >= maxWidth) {
      x.value = maxWidth - w;
    }

    if (y.value >= maxHeight || y.value + h >= maxHeight) {
      y.value = maxHeight - h;
    }

    if (x.value <= 0) {
      x.value = 0;
    }

    if (y.value <= 0) {
      y.value = 0;
    }
  };

  return {
    check: check,
  };
}
