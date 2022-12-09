import {reactive} from 'vue';

interface SelectionImageStoreInterface {
  image: string | null;
}

export const selectionImageStore = reactive<SelectionImageStoreInterface>({
  image: null,
});
