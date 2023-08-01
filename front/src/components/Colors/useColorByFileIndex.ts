import {useIndexes} from 'src/hooks/useIndexes';
import {mapRange} from 'src/utils/map-range';
import {alphaHighRef, chromaScaleRef} from '.././Scatter/useScatterColorScale';

export function useColorByFileIndex() {
  const {convertPointIndex} = useIndexes();

  const getColorByFileIndex = (
    pointIndex: number,
    filesCount: number,
  ): string => {
    const [fileIndex] = convertPointIndex(pointIndex);
    const rangedFileIndex = mapRange(fileIndex, 0, filesCount, 0, 1);

    return chromaScaleRef
      .value(rangedFileIndex)
      .alpha(alphaHighRef.value)
      .css();
  };

  return {
    getColorByFileIndex: getColorByFileIndex,
  };
}
