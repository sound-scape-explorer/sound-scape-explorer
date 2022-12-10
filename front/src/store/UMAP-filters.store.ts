import {reactive} from 'vue';

export type UMAPFiltersColorType =
  'labelIndex'
  | 'pointIndex'
  | 'by1h'
  | 'by10min'
  | 'isDay'
  | string

export interface UMAPFiltersStoreInterface {
  tags: string[];
  colorType: UMAPFiltersColorType;
  colorScale: string;
}

export const UMAPFiltersStore = reactive<UMAPFiltersStoreInterface>({
  tags: [],
  colorType: 'labelIndex',
  colorScale: 'Dark2',
});
