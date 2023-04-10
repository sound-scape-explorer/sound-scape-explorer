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
  | string

export interface ColorsStore {
  colorType: ColorType; // TODO: Rename to better like `sort` or something
  colorScale: string;
}

export const colorsStore = reactive<ColorsStore>({
  colorType: 'pointIndex',
  colorScale: 'Dark2',
});
