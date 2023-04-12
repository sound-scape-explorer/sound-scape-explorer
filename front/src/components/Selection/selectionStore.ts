import {reactive} from 'vue';

interface SelectionStore {
  reducer: number | null;
  band: string | null;
  integration: string | null;
}

export const selectionStore = reactive<SelectionStore>({
  reducer: null,
  band: null,
  integration: null,
});
