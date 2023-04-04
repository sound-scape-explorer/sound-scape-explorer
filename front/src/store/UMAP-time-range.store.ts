import {reactive} from 'vue';

export interface UMAPTimeRangeStoreInterface {
  /**
   * The whole time range is selected.
   */
  isAllSelected: boolean;
  /**
   * Window duration.
   */
  duration: number;
  /**
   * The current time.
   */
  value: number;
  /**
   * The minimum time in range.
   */
  min: number;
  /**
   * The maximum time in range.
   */
  max: number;
}

export const UMAPTimeRangeStore = reactive<UMAPTimeRangeStoreInterface>({
  isAllSelected: true,
  duration: 3600,
  value: -1,
  min: -1,
  max: -1,
});
