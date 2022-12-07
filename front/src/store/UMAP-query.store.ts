import {reactive} from 'vue';

export interface UMAPQueryStoreInterface {
  matches: string[];
  query: string;
}

export const UMAPQueryStore = reactive<UMAPQueryStoreInterface>({
  matches: [],
  query: '',
});
