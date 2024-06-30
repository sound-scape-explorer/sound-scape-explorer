import type {Scale} from 'chroma-js';
import {mapRange} from 'src/utils/map-range';

export function useColorByIntervalIndex() {
  const getColor = (index: number, count: number, scale: Scale): string => {
    const rangedIndex = mapRange(index, 0, count, 0, 1);
    return scale(rangedIndex).css();
  };

  return {
    getColor: getColor,
  };
}
