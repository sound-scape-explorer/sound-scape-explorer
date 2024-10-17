import {computed, ref} from 'vue';

type Size = 128 | 256 | 512 | 1024 | 2048 | 4096;

const sizes: Size[] = [128, 256, 512, 1024, 2048, 4096];
const size = ref<Size>(4096);

export function useAudioFourier() {
  const i = computed(() => sizes.indexOf(size.value));

  const increase = () => {
    const n = i.value + 1;

    if (i.value === -1 || n >= sizes.length) {
      return;
    }

    size.value = sizes[n];
  };

  const decrease = () => {
    const p = i.value - 1;

    if (i.value === -1 || p <= 0) {
      return;
    }

    size.value = sizes[p];
  };

  return {
    size: size,
    increase: increase,
    decrease: decrease,
  };
}
