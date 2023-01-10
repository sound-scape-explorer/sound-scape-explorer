import {reactive} from 'vue';

interface UMAPLegendStoreInterface {
  isOpen: boolean;
}

export const UMAPLegendStore = reactive<UMAPLegendStoreInterface>({
  isOpen: false,
});
