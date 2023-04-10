import {reactive} from 'vue';
import type {Dataset} from '../../lib/scatter-gl-0.0.13';

export interface ScatterDatasetStore {
  dataset: Dataset | null;
  isLoading: boolean;
}

export const scatterDatasetStore = reactive<ScatterDatasetStore>({
  dataset: null,
  isLoading: false,
});
