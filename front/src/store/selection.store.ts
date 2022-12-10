import {reactive} from 'vue';

interface SelectionStoreInterface {
  band: string | null;
  interval: string | null;
}

export const selectionStore = reactive<SelectionStoreInterface>({
  band: null,
  interval: null,
});
