import {reactive} from 'vue';

export type UMAPFiltersColorType =
  'labelIndex'
  | 'pointIndex'
  | 'by1h'
  | 'by10min'
  | 'isDay'
  | 'cycleDay'
  | string

export interface UMAPFiltersStoreInterface {
  colorType: UMAPFiltersColorType;
  colorScale: string;
}

export const UMAPFiltersStore = reactive<UMAPFiltersStoreInterface>({
  colorType: 'labelIndex',
  colorScale: 'Dark2',
});
