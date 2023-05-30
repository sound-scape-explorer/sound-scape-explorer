import {reactive} from 'vue';
import type {StorageReducer} from './useStorageReducers';
import {loadingStore} from 'src/components/Loading/loadingStore';

interface ReducerReactive {
  value: StorageReducer | null;
}

export const reducerRef = reactive<ReducerReactive>({
  value: null,
});

export function useReducer() {
  const setReducer = async (reducer: StorageReducer) => {
    loadingStore.isLoading = true;
    reducerRef.value = reducer;
  };

  return {
    setReducer: setReducer,
  };
}
