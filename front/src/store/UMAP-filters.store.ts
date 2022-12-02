import {reactive} from 'vue';

export interface UMAPFiltersStoreInterface {
  tags: string[];
  colorType: 'labelIndex' | 'pointIndex' | 'hour' | 'isDay';
  colorScale: string;
}

export const UMAPFiltersStore = reactive<UMAPFiltersStoreInterface>({
  tags: [],
  colorType: 'labelIndex',
  colorScale: 'Dark2',
});
