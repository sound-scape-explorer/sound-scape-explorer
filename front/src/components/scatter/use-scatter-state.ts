import {ref} from 'vue';

const isEnabled = ref<boolean>(false);
const isRendering = ref<boolean>(false);

const isLoading = ref<boolean>(false);
const loadingText = ref<string>('');

export function useScatterState() {
  return {
    isEnabled,
    isRendering,
    isLoading,
    loadingText,
  };
}
