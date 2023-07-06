import {reducedFeaturesRef} from 'src/hooks/useStorageReducedFeatures';
import {reactive, watchEffect} from 'vue';
import type {Points, PointMetadata, Dataset} from 'src/lib/scatter-gl-0.0.13';
import {ScatterGL} from 'src/lib/scatter-gl-0.0.13';
import {loadingStore} from '../Loading/loadingStore';

interface DatasetRef {
  value: Dataset | null;
}

export const datasetRef = reactive<DatasetRef>({
  value: null,
});

interface IsDatasetReadyRef {
  value: boolean | null;
}

export const isDatasetReadyRef = reactive<IsDatasetReadyRef>({
  value: null,
});

export function useScatterDataset() {
  const readDataset = () => {
    if (reducedFeaturesRef.value === null) {
      isDatasetReadyRef.value = false;
      return;
    }

    const features = reducedFeaturesRef.value;

    const metadata: PointMetadata[] = features.map((_, f) => ({
      label: f.toString(), // pointIndex
    }));

    datasetRef.value = new ScatterGL.Dataset(features as Points, metadata);
    loadingStore.isLoading = false;
    isDatasetReadyRef.value = true;
  };

  watchEffect(readDataset);
}
