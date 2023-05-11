import {reactive} from 'vue';
import type {StorageReducer} from './useStorageReducers';

interface ReducerReactive {
  value: StorageReducer | null;
}

export const reducerRef = reactive<ReducerReactive>({
  value: null,
});

export function useReducer() {
  const setReducer = async (reducer: StorageReducer) => {
    reducerRef.value = reducer;
  };

  return {
    setReducer: setReducer,
  };
}
