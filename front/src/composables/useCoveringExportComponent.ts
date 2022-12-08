import {ref} from 'vue';

export function useCoveringExportComponent() {
  const loadingRef = ref(false);

  return {
    loadingRef,
  };
}
