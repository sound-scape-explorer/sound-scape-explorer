import {reactive} from 'vue';

interface MetaStore {
  isOpen: boolean;
}

export const metaStore = reactive<MetaStore>({
  isOpen: false,
});
