import {reactive} from 'vue';

export interface UMAPTimeRangeStoreInterface {
  isAllSelected: boolean;
  value: number;
  /**
   * Window duration
   */
  duration: number;
}

export const UMAPTimeRangeStore = reactive<UMAPTimeRangeStoreInterface>({
  isAllSelected: true,
  value: -1,
  duration: 3600,
});
