import {ref, unref} from 'vue';

const a = ref<string | null>(null);
const b = ref<string | null>(null);

export function useDraggableHeatmapsLabels() {
  const swap = () => {
    if (a.value === null || b.value === null) {
      return;
    }

    const savedA = unref(a.value);
    const savedB = unref(b.value);

    a.value = savedB;
    b.value = savedA;
  };

  const reset = () => {
    a.value = null;
    b.value = null;
  };

  return {
    a,
    b,
    swap,
    reset,
  };
}
