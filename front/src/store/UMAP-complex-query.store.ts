import {reactive} from 'vue';

export interface UMAPComplexQueryStoreInterface {
  matches: string[];
  complexQuery: string;
}

export const UMAPComplexQueryStore = reactive<UMAPComplexQueryStoreInterface>({
  matches: [],
  complexQuery: '',
});
