import {reactive} from 'vue';

interface ModalLoadingStoreInterface {
  isLoading: boolean;
}

export const modalLoadingStore = reactive<ModalLoadingStoreInterface>({
  isLoading: false,
});
