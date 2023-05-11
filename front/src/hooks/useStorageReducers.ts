import {onMounted, reactive} from 'vue';
import {fileRef} from './useFile';
import {workerRef} from './useWorker';

export interface StorageReducer {
  index: number;
  name: string;
  dimensions: number;
  bands: string[];
  integrations: string[];
  ranges: string[];
}

interface ReducersRef {
  value: StorageReducer[] | null;
}

export const reducersRef = reactive<ReducersRef>({
  value: null,
});

export function useStorageReducers() {
  onMounted(async () => {
    if (fileRef.value === null || workerRef.value === null) {
      return;
    }

    reducersRef.value = await workerRef.value.readReducers(fileRef.value);
  });
}
