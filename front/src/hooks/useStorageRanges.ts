import {onMounted, reactive} from 'vue';
import {fileRef} from './useFile';
import {workerRef} from './useWorker';

export interface StorageRanges {
  [range: string]: number[];
}

interface RangesRef {
  value: StorageRanges | null;
}

export const rangesRef = reactive<RangesRef>({
  value: null,
});

export function useStorageRanges() {
  onMounted(async () => {
    if (fileRef.value === null || workerRef.value === null) {
      return;
    }

    rangesRef.value = await workerRef.value.readRanges(fileRef.value);
  });
}
