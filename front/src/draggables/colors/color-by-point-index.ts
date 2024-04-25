import {chromaScaleRef} from 'src/scatter/scatter-color-scale';
import {mapRange} from 'src/utils/map-range';

export function useColorByPointIndex() {
  const getColorByPointIndex = (
    pointIndex: number,
    pointsCount: number,
  ): string => {
    const rangedPointIndex = mapRange(pointIndex, 0, pointsCount, 0, 1);
    return chromaScaleRef.value(rangedPointIndex).css();
  };

  return {
    getColorByPointIndex: getColorByPointIndex,
  };
}
