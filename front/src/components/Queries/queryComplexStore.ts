import {reactive} from 'vue';

export interface QueryComplexItem {
  [itemName: string]: string | string[];
}

export interface QueryComplexGroup {
  [groupName: string]: QueryComplexItem[];
}

export interface QueryComplexStore {
  isActive: boolean;
  queryComplex: QueryComplexItem | QueryComplexGroup;
  hasGroups: boolean;

}

export const queriesComplexStore = reactive<QueryComplexStore>({
  isActive: false,
  queryComplex: {},
  hasGroups: false,
});
