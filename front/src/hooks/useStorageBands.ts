import {onMounted, ref} from 'vue';
import {fileRef} from './useFile';
import {workerRef} from './useWorker';

export interface StorageBands {
  [band: string]: number[];
}

export function useStorageBands() {
  const bandsRef = ref<StorageBands | null>(null);

  onMounted(async () => {
    if (fileRef.value === null || workerRef.value === null) {
      return;
    }

    bandsRef.value = await workerRef.value.readBands(fileRef.value);
  });

  return {
    bandsRef: bandsRef,
  };
}
