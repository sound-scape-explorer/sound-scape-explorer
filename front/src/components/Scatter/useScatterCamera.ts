import {ref} from 'vue';

const isLocked = ref<boolean>(false);

export function useScatterCamera() {
  const lock = () => {
    if (isLocked.value === false) {
      isLocked.value = true;
    }
  };

  const unlock = () => {
    if (isLocked.value === true) {
      isLocked.value = false;
    }
  };

  return {
    isLocked: isLocked,
    lock: lock,
    unlock: unlock,
  };
}
