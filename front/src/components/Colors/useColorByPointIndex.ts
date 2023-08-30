import {mapRange} from 'src/utils/map-range';

import {alphaHighRef, chromaScaleRef} from '.././Scatter/useScatterColorScale';

export function useColorByPointIndex() {
  const getColorByPointIndex = (
    pointIndex: number,
    pointsCount: number,
  ): string => {
    const rangedPointIndex = mapRange(pointIndex, 0, pointsCount, 0, 1);

    return chromaScaleRef
      .value(rangedPointIndex)
      .alpha(alphaHighRef.value)
      .css();
  };

  return {
    getColorByPointIndex: getColorByPointIndex,
  };
}
