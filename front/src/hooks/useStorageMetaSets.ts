import {reactive, watchEffect} from 'vue';

import {labelsRef} from './useLabels';

interface MetaSetsRef {
  value: string[][] | null;
}

export const metaSetsRef = reactive<MetaSetsRef>({
  value: null,
});

export function useStorageMetaSets() {
  const readMetaSets = () => {
    if (labelsRef.value === null) {
      return;
    }

    metaSetsRef.value = Object.values(labelsRef.value);
  };

  watchEffect(readMetaSets);
}
