import {ref} from 'vue';

const isLocked = ref<boolean>(false);

export function useImportLock() {
  return {
    isLocked: isLocked,
  };
}
