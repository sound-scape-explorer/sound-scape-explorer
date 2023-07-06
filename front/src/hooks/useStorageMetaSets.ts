import {reactive, watchEffect} from 'vue';
import {metasRef} from './useStorageMetas';

interface MetaSetsRef {
  value: string[][] | null;
}

export const metaSetsRef = reactive<MetaSetsRef>({
  value: null,
});

export function useStorageMetaSets() {
  const readMetaSets = () => {
    if (metasRef.value === null) {
      return;
    }

    metaSetsRef.value = Object.values(metasRef.value);
  };

  watchEffect(readMetaSets);
}
