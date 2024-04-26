import {useStorageReader} from 'src/composables/storage-reader';
import {useStorageReady} from 'src/composables/storage-ready';
import {reactive, watch} from 'vue';

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

export function useStorageRanges() {
  const {read} = useStorageReader();
  const {isReady} = useStorageReady();

  const readAll = async () => {
    if (!isReady.value) {
      return;
    }

    await read(async (worker, file) => {
      rangesRef.value = await worker.readRanges(file);
    });
  };

  watch(isReady, readAll);

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
