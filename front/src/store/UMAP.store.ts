import {reactive} from 'vue';

export interface UMAPStoreInterface {
  alpha: {
    low: number;
    high: number;
  };
}

export const UMAPStore = reactive<UMAPStoreInterface>({
  alpha: {
    low: 0.01,
    high: 0.7,
  },
});
