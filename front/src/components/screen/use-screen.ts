import {ref} from 'vue';

const isEnabled = ref<boolean>(false);
const selected = ref<number[]>([]);

export function useScreen() {
  const enable = () => {
    if (isEnabled.value === true) {
      return;
    }

    isEnabled.value = true;
  };

  const disable = () => {
    if (isEnabled.value === false) {
      return;
    }

    isEnabled.value = false;
  };

  return {
    isEnabled,
    disable,
    enable,
    selected,
  };
}
