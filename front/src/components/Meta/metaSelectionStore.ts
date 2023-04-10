import {reactive} from 'vue';

interface MetaSelectionStore {
  selection: {
    [metaProperty: string]: string[];
  };
}

export const metaSelectionStore = reactive<MetaSelectionStore>({
  selection: {},
});
