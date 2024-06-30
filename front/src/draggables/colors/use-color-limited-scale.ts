import type {Scale} from 'chroma-js';

export function useLimitedColorScale() {
  const createLimitedColorScale = (
    length: number,
    scale: Scale,
  ): [number, number, number][] => {
    return scale.colors(length, 'rgb');
  };

  return {
    createLimitedColorScale: createLimitedColorScale,
  };
}
