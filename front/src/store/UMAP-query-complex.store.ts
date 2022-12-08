import {reactive} from 'vue';

interface QueryComplexItem {
  [itemName: string]: string | string[];
}

interface QueryComplexGroup {
  [groupName: string]: QueryComplexItem[];
}

export interface UMAPQueryComplexStoreInterface {
  matches: string[];
  queryComplex: QueryComplexItem | QueryComplexGroup;
}

export const UMAPQueryComplexStore = reactive<UMAPQueryComplexStoreInterface>({
  matches: [],
  queryComplex: {},
});
