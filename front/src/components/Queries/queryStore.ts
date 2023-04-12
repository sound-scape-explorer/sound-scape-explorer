import {reactive} from 'vue';

export interface QueryStore {
  matches: string[];
  query: string;
}

export const queryStore = reactive<QueryStore>({
  matches: [],
  query: '',
});
