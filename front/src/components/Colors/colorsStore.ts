import {reactive} from 'vue';

export type ColorType =
  | 'pointIndex'
  | 'fileIndex'
  | 'groupIndex'
  | 'by1h'
  | 'by10min'
  | 'isDay'
  | 'cycleDay'
  | 'byAutocluster'
  | string;

export interface ColorsStore {
  colorType: ColorType;
  colorScale: string;
}

export const colorsStore = reactive<ColorsStore>({
  colorType: 'pointIndex',
  colorScale: 'Dark2',
});
