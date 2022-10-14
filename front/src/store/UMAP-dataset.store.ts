import {reactive} from 'vue';
import type {Dataset} from 'scatter-gl';

export interface UMAPDatasetStoreInterface {
  dataset: Dataset | null;
}

export const UMAPDatasetStore = reactive<UMAPDatasetStoreInterface>({
  dataset: null,
});
