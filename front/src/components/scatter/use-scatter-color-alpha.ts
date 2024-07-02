import {ref} from 'vue';

const high = ref<number>(0.8);
const low = ref<number>(0.005);

export function useScatterColorAlpha() {
  return {
    high: high,
    low: low,
  };
}
