import {chromaScaleRef} from '.././Scatter/useScatterColorScale';

export function useLimitedColorScale() {
  const createLimitedColorScale = (
    length: number,
  ): [number, number, number][] => {
    return chromaScaleRef.value.colors(length, 'rgb');
  };

  return {
    createLimitedColorScale: createLimitedColorScale,
  };
}
