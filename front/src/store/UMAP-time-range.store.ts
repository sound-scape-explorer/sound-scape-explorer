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
  value: number | null;
  /**
   * The minimum time in range.
   */
  min: number | null;
  /**
   * The maximum time in range.
   */
  max: number | null;
}

export const UMAPTimeRangeStore = reactive<UMAPTimeRangeStoreInterface>({
  isAllSelected: true,
  duration: 3600,
  value: null,
  min: null,
  max: null,
});
