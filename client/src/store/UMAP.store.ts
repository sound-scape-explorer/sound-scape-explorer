import type {ApiUMAPInterface} from '../interfaces/api-UMAP.interface';
import {reactive} from 'vue';

export interface UMAPStoreInterface {
  data: ApiUMAPInterface | null;
}

export const UMAPStore = reactive<UMAPStoreInterface>({
  data: null,
});
