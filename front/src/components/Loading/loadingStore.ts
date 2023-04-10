import {reactive} from 'vue';

interface LoadingStore {
  isLoading: boolean;
}

export const loadingStore = reactive<LoadingStore>({
  isLoading: false,
});
