import {PLOTLY_SIZE} from 'src/constants';
import {type Ref} from 'vue';

export function useAppPlotSize(
  width: Nullable<Ref<number>>,
  height: Nullable<Ref<number>>,
) {
  const updateWidth = (newWidth: number = PLOTLY_SIZE) => {
    if (width === null) {
      return;
    }

    width.value = newWidth;
  };

  const updateHeight = (newHeight: number = PLOTLY_SIZE) => {
    if (height === null) {
      return;
    }

    height.value = newHeight;
  };

  const resize1by1 = () => {
    updateWidth();
    updateHeight();
  };

  const resize4by3 = () => {
    updateWidth(PLOTLY_SIZE * (4 / 3));
    updateHeight();
  };

  const resize16by10 = () => {
    updateWidth(PLOTLY_SIZE * (16 / 10));
    updateHeight();
  };

  const resize16by9 = () => {
    updateWidth(PLOTLY_SIZE * (16 / 9));
    updateHeight();
  };

  const double = () => {
    if (width !== null) {
      updateWidth(width.value * 2);
    }

    if (height !== null) {
      updateHeight(height.value * 2);
    }
  };

  const half = () => {
    if (width !== null) {
      width.value = width.value * 0.5;
    }

    if (height !== null) {
      height.value = height.value * 0.5;
    }
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
