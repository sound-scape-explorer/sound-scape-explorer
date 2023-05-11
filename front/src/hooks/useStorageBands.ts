import {onMounted, reactive} from 'vue';
import {fileRef} from './useFile';
import {workerRef} from './useWorker';

export interface StorageBands {
  [band: string]: number[];
}

interface BandsRef {
  value: StorageBands | null;
}

export const bandsRef = reactive<BandsRef>({
  value: null,
});

export function useStorageBands() {
  onMounted(async () => {
    if (fileRef.value === null || workerRef.value === null) {
      return;
    }

    bandsRef.value = await workerRef.value.readBands(fileRef.value);
  });
}
