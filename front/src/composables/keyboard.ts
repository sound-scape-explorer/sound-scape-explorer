import {onKeyStroke} from '@vueuse/core';
import {ref} from 'vue';

import type {KeyboardShortcut} from '../common/KeyboardShortcut';

const isLocked = ref<boolean>(false);

export function useKeyboard() {
  const registerKey = (key: KeyboardShortcut, callback: () => void): void => {
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
    registerKey: registerKey,
    lock: lock,
    unlock: unlock,
  };
}
