import {reactive} from 'vue';

export interface UMAPQueryStoreInterface {
  matches: string[];
}

export const UMAPQueryStore = reactive<UMAPQueryStoreInterface>({
  matches: [],
});
