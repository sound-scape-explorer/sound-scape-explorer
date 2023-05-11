import {slicesPerGroupRef} from '../hooks/useStorageSlicesPerGroup';

export function useIndexes() {
  const convertPointIndex = (pointIndex: number) => {
    if (slicesPerGroupRef.value === null) {
      throw new Error('Slices per group is null.');
    }

    const fileIndex = Math.floor(pointIndex / slicesPerGroupRef.value);
    const groupIndex = pointIndex % slicesPerGroupRef.value;

    return [fileIndex, groupIndex];
  };

  return {
    convertPointIndex: convertPointIndex,
  };
}
