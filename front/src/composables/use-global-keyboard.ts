import {onKeyStroke} from '@vueuse/core';
import {type Shortcuts} from 'src/composables/use-shortcuts';
import {ref} from 'vue';

const isLocked = ref<boolean>(false);

export function useGlobalKeyboard() {
  const registerKey = (key: Shortcuts, callback: () => void): void => {
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
    isLocked: isLocked,
  };
}
