import {useIndexes} from 'src/hooks/useIndexes';
import {alphaHighRef, chromaScaleRef} from '../Scatter/useScatterColorScale';
import {mapRange} from 'src/utils/map-range';

export function useColorByGroupIndex() {
  const {convertPointIndex} = useIndexes();

  const getColorByGroupIndex = (
    pointIndex: number,
    groupsCount: number,
  ): string => {
    const [, groupIndex] = convertPointIndex(pointIndex);
    const rangedGroupIndex = mapRange(groupIndex, 0, groupsCount, 0, 1);

    return chromaScaleRef
      .value(rangedGroupIndex)
      .alpha(alphaHighRef.value)
      .css();
  };

  return {
    getColorByGroupIndex: getColorByGroupIndex,
  };
}
