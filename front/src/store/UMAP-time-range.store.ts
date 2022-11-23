import {reactive} from 'vue';

export interface UMAPTimeRangeStoreInterface {
  isAllSelected: boolean;
  range: (number | undefined | null)[];
  start: (number | null)[];
  end: number | null;
}

export const UMAPTimeRangeStore = reactive<UMAPTimeRangeStoreInterface>({
  isAllSelected: true,
  range: [null, null],
  start: [null],
  end: null,
});
