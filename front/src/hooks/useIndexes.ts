import {groupCountsByPointIndexesRef} from './useStorageGroupCountsByPointIndexes';

export function useIndexes() {
  const convertPointIndex = (pointIndex: number) => {
    if (groupCountsByPointIndexesRef.value === null) {
      throw new Error('Group counts is null.');
    }

    const groupCount = groupCountsByPointIndexesRef.value[pointIndex];
    const fileIndex = Math.floor(pointIndex / groupCount);
    const groupIndex = pointIndex % groupCount;

    return [fileIndex, groupIndex];
  };

  return {
    convertPointIndex: convertPointIndex,
  };
}
