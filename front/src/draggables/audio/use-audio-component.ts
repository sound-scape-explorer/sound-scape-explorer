import {FFT_SIZE} from 'src/constants';
import {ref} from 'vue';

const size = ref<number>(FFT_SIZE.default);

export function useAudioFourier() {
  const increase = () => {
    if (size.value * 2 > FFT_SIZE.max) {
      return;
    }

    size.value *= 2;
  };

  const decrease = () => {
    if (size.value / 2 < FFT_SIZE.min) {
      return;
    }

    size.value /= 2;
  };

  return {
    size: size,
    increase: increase,
    decrease: decrease,
  };
}
