import {reactive} from 'vue';

interface SelectionStoreInterface {
  reducer: number | null;
  band: string | null;
  integration: string | null;
}

export const selectionStore = reactive<SelectionStoreInterface>({
  reducer: null,
  band: null,
  integration: null,
});
