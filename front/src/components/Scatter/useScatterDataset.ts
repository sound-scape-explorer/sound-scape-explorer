import {reducedFeaturesRef} from 'src/hooks/useStorageReducedFeatures';
import {reactive, ref, watch} from 'vue';
import type {Points, PointMetadata, Dataset} from 'src/lib/scatter-gl-0.0.13';
import {ScatterGL} from 'src/lib/scatter-gl-0.0.13';

interface DatasetRef {
  value: Dataset | null;
}

export const datasetRef = reactive<DatasetRef>({
  value: null,
});

export function useScatterDataset() {
  const isDatasetReadyRef = ref<boolean | null>(null);

  watch(reducedFeaturesRef, () => {
    if (reducedFeaturesRef.value === null) {
      isDatasetReadyRef.value = false;
      return;
    }

    const features = reducedFeaturesRef.value;

    const metadata: PointMetadata[] = features.map((_, f) => ({
      label: f.toString(), // pointIndex
    }));

    datasetRef.value = new ScatterGL.Dataset(features as Points, metadata);
    isDatasetReadyRef.value = true;
  });

  return {
    isDatasetReadyRef: isDatasetReadyRef,
  };
}
