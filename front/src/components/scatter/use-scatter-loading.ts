import {ref} from 'vue';

const isLoading = ref<boolean>(false);
const loadingText = ref<string>('');

export function useScatterLoading() {
  return {
    isLoading,
    loadingText,
  };
}
