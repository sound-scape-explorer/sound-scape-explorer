import {reactive, watchEffect} from 'vue';

import {useWorker} from './useWorker';

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
  const {read} = useWorker();

  const readRanges = () =>
    read(async (worker, storage) => {
      rangesRef.value = await worker.readRanges(storage);
    });

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