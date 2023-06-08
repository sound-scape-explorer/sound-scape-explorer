import {reactive} from 'vue';

interface MetaSelectionStore {
  selection: string[][];
}

export const metaSelectionStore = reactive<MetaSelectionStore>({
  selection: [],
});
