import {reactive} from 'vue';

export interface UMAPTimeRangeStoreInterface {
  isAllSelected: boolean;
  range: number[];
}

export const UMAPTimeRangeStore = reactive<UMAPTimeRangeStoreInterface>({
  isAllSelected: true,
  range: [-1, -1],
});
