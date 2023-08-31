import {reactive, watchEffect} from 'vue';
import {workerRef} from './useWorker';
import {storageFileRef} from './useStorageFile';

export interface Range {
  index: number;
  name: string;
  start: number;
  end: number;
}

interface RangeRef {
  value: Range | null;
}

export const rangeRef = reactive<RangeRef>({
  value: null,
});

interface RangesRef {
  value: Range[] | null;
}

export const rangesRef = reactive<RangesRef>({
  value: null,
});

export function useRanges() {
  const readRanges = async () => {
    if (workerRef.value === null || storageFileRef.value === null) {
      return;
    }

    rangesRef.value = await workerRef.value.readRanges(storageFileRef.value);
  };

  watchEffect(readRanges);

  const selectRange = (name: string | null) => {
    if (name === null) {
      rangeRef.value = null;
      return;
    }

    if (rangesRef.value === null) {
      return;
    }

    rangeRef.value = rangesRef.value.filter((range) => range.name === name)[0];
  };

  return {
    selectRange: selectRange,
  };
}
