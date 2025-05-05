import {ref} from 'vue';

const from = ref<number | null>(null);
const to = ref<number | null>(null);

export function useTemporalThresholds() {
  const reset = () => {
    from.value = null;
    to.value = null;
  };

  return {
    from,
    to,
    reset,
  };
}
