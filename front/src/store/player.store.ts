import {reactive} from 'vue';

export type ColorMap = 'hot' | 'jet'

interface PlayerStore {
  src: null | string;
  timestamp: null | number;
  colorMap: ColorMap;
}

export const playerStore = reactive<PlayerStore>({
  src: null,
  timestamp: null,
  colorMap: 'hot',
});
