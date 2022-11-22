import {reactive} from 'vue';

export interface UMAPTimeRangeStoreInterface {
  range: (number | undefined | null)[];
}

export const UMAPTimeRangeStore = reactive<UMAPTimeRangeStoreInterface>({
  range: [undefined, undefined],
});
