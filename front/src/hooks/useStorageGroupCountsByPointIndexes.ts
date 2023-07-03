import {reactive, watch} from 'vue';
import {filesGroupCountsRef} from 'src/hooks/useStorageFilesGroupCounts';

interface GroupCountsByPointIndexesRef {
  value: number[] | null;
}

export const groupCountsByPointIndexesRef =
  reactive<GroupCountsByPointIndexesRef>({
    value: null,
  });

export function useStorageGroupCountsByPointIndexes() {
  watch(filesGroupCountsRef, () => {
    if (filesGroupCountsRef.value === null) {
      return;
    }

    const payload: number[] = [];
    const filesCount = filesGroupCountsRef.value.length;

    for (let f = 0; f < filesCount; f += 1) {
      const groupCount = filesGroupCountsRef.value[f];

      for (let g = 0; g < groupCount; g += 1) {
        payload.push(groupCount);
      }
    }

    groupCountsByPointIndexesRef.value = payload;
  });
}
