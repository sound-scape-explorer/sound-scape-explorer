import {ref} from 'vue';

const fromString = ref<string>('');
const toString = ref<string>('');

export function useTemporalThresholds() {
  const reset = () => {
    fromString.value = '';
    toString.value = '';
  };

  return {
    fromString,
    toString,
    reset,
  };
}
