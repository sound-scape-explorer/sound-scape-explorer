import {onKeyStroke} from '@vueuse/core';
import {reactive} from 'vue';

import type {KeyboardShortcut} from '../common/KeyboardShortcut';

interface KeyboardLockedRef {
  value: boolean;
}

export const keyboardLockedRef = reactive<KeyboardLockedRef>({
  value: false,
});

export function useKeyboard() {
  const registerKey = (key: KeyboardShortcut, callback: () => void): void => {
    onKeyStroke(
      key,
      () => {
        if (keyboardLockedRef.value) {
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

  const lockKeyboard = () => {
    keyboardLockedRef.value = true;
  };

  const unlockKeyboard = () => {
    keyboardLockedRef.value = false;
  };

  return {
    registerKey: registerKey,
    lockKeyboard: lockKeyboard,
    unlockKeyboard: unlockKeyboard,
  };
}
