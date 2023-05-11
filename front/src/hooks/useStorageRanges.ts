import {onMounted, ref} from 'vue';
import {fileRef} from './useFile';
import {workerRef} from './useWorker';

export interface StorageRanges {
  [range: string]: number[];
}

export function useStorageRanges() {
  const rangesRef = ref<StorageRanges | null>(null);

  onMounted(async () => {
    if (fileRef.value === null || workerRef.value === null) {
      return;
    }

    rangesRef.value = await workerRef.value.readRanges(fileRef.value);
  });

  return {
    rangesRef: rangesRef,
  };
}
