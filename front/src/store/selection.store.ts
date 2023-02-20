import {reactive} from 'vue';

interface SelectionStoreInterface {
  band: string | null;
  integration: string | null;
}

export const selectionStore = reactive<SelectionStoreInterface>({
  band: null,
  integration: null,
});
