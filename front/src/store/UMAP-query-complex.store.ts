import {reactive} from 'vue';

export interface UMAPQueryComplexStoreInterface {
  matches: string[];
  queryComplex: {
    [name: string]: string | string[];
  };
}

export const UMAPQueryComplexStore = reactive<UMAPQueryComplexStoreInterface>({
  matches: [],
  queryComplex: {},
});
