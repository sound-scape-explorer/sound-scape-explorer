import {ref} from 'vue';

const isLocked = ref<boolean>(false);

export function useOpenLock() {
  return {
    isLocked: isLocked,
  };
}
