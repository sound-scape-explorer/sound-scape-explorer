import {reactive} from 'vue';
import type {Dataset} from '../lib/scatter-gl-0.0.13';

export interface UMAPDatasetStoreInterface {
  dataset: Dataset | null;
  isLoading: boolean;
}

export const UMAPDatasetStore = reactive<UMAPDatasetStoreInterface>({
  dataset: null,
  isLoading: false,
});
