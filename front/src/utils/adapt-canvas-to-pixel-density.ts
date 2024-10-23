import {type Ref} from 'vue';

interface Props {
  canvas: Ref<HTMLCanvasElement | null>;
  context: Ref<CanvasRenderingContext2D | null>;
  width: Ref<number>;
  height: Ref<number>;
}

export function adaptCanvasToPixelDensity({
  canvas,
  context,
  width,
  height,
}: Props) {
  if (canvas.value === null || context.value === null) {
    return;
  }

  const dpr = window.devicePixelRatio || 1;
  canvas.value.width = width.value * dpr;
  canvas.value.height = height.value * dpr;
  context.value.scale(dpr, dpr);
}
