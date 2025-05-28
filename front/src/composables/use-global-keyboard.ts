import {onKeyStroke} from '@vueuse/core';
import {type Shortcut} from 'src/composables/use-shortcuts';
import {ref} from 'vue';

const isLocked = ref<boolean>(false);

export function useGlobalKeyboard() {
  const registerKey = (key: Shortcut, callback: () => void): void => {
    onKeyStroke(
      key,
      () => {
        if (isLocked.value) {
          return;
        }

        callback();
      },
      {
        eventName: 'keypress',
        dedupe: true,
      },
    );
  };

  const lock = () => {
    isLocked.value = true;
  };

  const unlock = () => {
    isLocked.value = false;
  };

  return {
    registerKey,
    lock,
    unlock,
    isLocked,
  };
}
