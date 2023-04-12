import {onMounted, onUnmounted} from 'vue';

export function useEventListener<K extends keyof WindowEventMap>(
  targetElement: Window | Document | HTMLElement,
  type: K,
  // eslint-disable-next-line no-unused-vars
  listener: (e: WindowEventMap[K]) => void,
) {
  onMounted(() => {
    targetElement.addEventListener(
      type,
      (e) => listener(e as WindowEventMap[K]),
    );
  });

  onUnmounted(() => {
    targetElement.removeEventListener(
      type,
      (e) => listener(e as WindowEventMap[K]),
    );
  });
}
