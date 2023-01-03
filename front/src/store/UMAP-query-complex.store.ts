import {reactive} from 'vue';

export interface QueryComplexItem {
  [itemName: string]: string | string[];
}

export interface QueryComplexGroup {
  [groupName: string]: QueryComplexItem[];
}

export interface UMAPQueryComplexStoreInterface {
  isActive: boolean;
  queryComplex: QueryComplexItem | QueryComplexGroup;
  hasGroups: boolean;

}

export const UMAPQueryComplexStore = reactive<UMAPQueryComplexStoreInterface>({
  isActive: false,
  queryComplex: {},
  hasGroups: false,
});
