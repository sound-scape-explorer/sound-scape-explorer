import {reactive, watchEffect} from 'vue';
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
  const readRanges = async () => {
    if (fileRef.value === null || workerRef.value === null) {
      return;
    }

    rangesRef.value = await workerRef.value.readRanges(fileRef.value);
    console.log(rangesRef.value);
  };

  watchEffect(readRanges);
}
