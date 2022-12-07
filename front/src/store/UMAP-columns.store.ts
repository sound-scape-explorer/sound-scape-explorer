import {reactive} from 'vue';

export interface UMAPColumnsStoreInterface {
  columns: {
    [column: string]: (string | number)[];
  };
}

export const UMAPColumnsStore = reactive<UMAPColumnsStoreInterface>({
  columns: {},
});
