import {PLOTLY_SIZE} from 'src/constants';
import {type Ref} from 'vue';

export function useAppPlotSize(
  width: Ref<number | undefined>,
  height: Ref<number | undefined>,
) {
  const updateWidth = (newWidth: number = PLOTLY_SIZE) => {
    if (width.value === undefined) {
      return;
    }

    width.value = newWidth;
  };

  const updateHeight = (newHeight: number = PLOTLY_SIZE) => {
    if (height.value === undefined) {
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
    if (width.value !== undefined) {
      updateWidth(width.value * 2);
    }

    if (height.value !== undefined) {
      updateHeight(height.value * 2);
    }
  };

  const half = () => {
    if (width.value !== undefined) {
      width.value = width.value * 0.5;
    }

    if (height.value !== undefined) {
      height.value = height.value * 0.5;
    }
  };

  return {
    width,
    height,
    resize1by1,
    resize4by3,
    resize16by10,
    resize16by9,
    double,
    half,
  };
}
