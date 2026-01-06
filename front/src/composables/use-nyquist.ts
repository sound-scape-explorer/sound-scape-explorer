import {ref} from 'vue';

const nyquist = ref<number>(0);

export function useNyquist() {
  const set = (newSampleRate: number) => {
    nyquist.value = newSampleRate * 0.5;
  };

  return {
    nyquist,
    set,
  };
}
