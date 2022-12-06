import {reactive} from 'vue';

export interface UMAPColumnsStoreInterface {
  columns: {
    [column: string]: {
      [item: string]: string;
    };
  };
}

export const UMAPColumnsStore = reactive<UMAPColumnsStoreInterface>({
  columns: {},
});
