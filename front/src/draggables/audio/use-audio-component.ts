import {computed, ref} from 'vue';

type Size = 128 | 256 | 512 | 1024 | 2048 | 4096;

const sizes: Size[] = [128, 256, 512, 1024, 2048, 4096];
const size = ref<Size>(4096);

export function useAudioFourier() {
  // TODO: maybe extract these
  const i = computed(() => sizes.indexOf(size.value));
  const n = computed(() => i.value + 1);
  const p = computed(() => i.value - 1);
  const canIncrease = computed(() => n.value < sizes.length);
  const canDecrease = computed(() => p.value > 0);

  const increase = () => {
    if (!canIncrease.value) {
      return;
    }

    size.value = sizes[n.value];
  };

  const decrease = () => {
    if (!canDecrease.value) {
      return;
    }

    size.value = sizes[p.value];
  };

  return {
    size: size,
    increase: increase,
    decrease: decrease,
    canIncrease: canIncrease,
    canDecrease: canDecrease,
  };
}
