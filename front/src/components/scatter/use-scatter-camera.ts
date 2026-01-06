import {ref} from 'vue';

const isLocked = ref<boolean>(false);

export function useScatterCamera() {
  const handleGlobalMouseUp = () => {
    unlock();
    document.removeEventListener('mouseup', handleGlobalMouseUp);
  };

  const lock = () => {
    if (isLocked.value === false) {
      isLocked.value = true;
    }

    document.addEventListener('mouseup', handleGlobalMouseUp);
  };

  const unlock = () => {
    if (isLocked.value === true) {
      isLocked.value = false;
    }
  };

  return {
    isLocked,
    lock,
    unlock,
  };
}
