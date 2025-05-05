import {type Scale} from 'chroma-js';

export function useColorResize() {
  const resize = (scale: Scale, size: number): [number, number, number][] => {
    return scale.colors(size, 'rgb');
  };

  return {
    resize,
  };
}
