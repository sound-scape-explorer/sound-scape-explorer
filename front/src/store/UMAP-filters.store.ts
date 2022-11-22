import {reactive} from 'vue';

export interface UMAPFiltersStoreInterface {
  tags: string | null;
  colorType: 'labelIndex' | 'pointIndex' | 'hour' | 'isDay';
}

export const UMAPFiltersStore = reactive<UMAPFiltersStoreInterface>({
  tags: null,
  colorType: 'labelIndex',
});
