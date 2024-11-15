import {PLOTLY_SIZE} from 'src/constants';
import {type Ref} from 'vue';

export function useAppPlotSize(width: Ref<number>, height: Ref<number>) {
  const resize1by1 = () => {
    width.value = PLOTLY_SIZE;
    height.value = PLOTLY_SIZE;
  };

  const resize4by3 = () => {
    width.value = PLOTLY_SIZE * (4 / 3);
    height.value = PLOTLY_SIZE;
  };

  const resize16by10 = () => {
    width.value = PLOTLY_SIZE * (16 / 10);
    height.value = PLOTLY_SIZE;
  };

  const resize16by9 = () => {
    width.value = PLOTLY_SIZE * (16 / 9);
    height.value = PLOTLY_SIZE;
  };

  const double = () => {
    width.value = width.value * 2;
    height.value = height.value * 2;
  };

  const half = () => {
    width.value = width.value * 0.5;
    height.value = height.value * 0.5;
  };

  return {
    width: width,
    height: height,
    resize1by1: resize1by1,
    resize4by3: resize4by3,
    resize16by10: resize16by10,
    resize16by9: resize16by9,
    double: double,
    half: half,
  };
}
