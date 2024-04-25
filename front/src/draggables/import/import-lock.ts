import {reactive} from 'vue';

interface ImportLockRef {
  value: boolean;
}

export const importLockRef = reactive<ImportLockRef>({
  value: false,
});
