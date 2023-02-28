import {reactive} from 'vue';

interface SelectionStoreInterface {
  band: string | null;
  umapName: string | null;
}

export const selectionStore = reactive<SelectionStoreInterface>({
  band: null,
  umapName: null,
});
