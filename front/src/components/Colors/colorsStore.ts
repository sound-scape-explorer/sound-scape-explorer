import {reactive} from 'vue';

export type ColorType =
  | 'intervalIndex'
  | 'by1h'
  | 'by10min'
  | 'isDay'
  | 'cycleDay';

export interface ColorsStore {
  colorType: ColorType;
  colorScale: string;
}

export const colorsStore = reactive<ColorsStore>({
  colorType: 'cycleDay',
  colorScale: 'Dark2',
});
