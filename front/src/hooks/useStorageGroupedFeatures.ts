import {onMounted, ref} from 'vue';
import {bandRef} from './useBand';
import {integrationRef} from './useIntegration';
import {fileRef} from './useFile';
import {workerRef} from './useWorker';

export type StorageGroupedFeatures = number[][];

export function useStorageGroupedFeatures() {
  const groupedFeaturesRef = ref<StorageGroupedFeatures | null>(null);

  onMounted(async () => {
    if (
      workerRef.value === null ||
      fileRef.value === null ||
      bandRef.value === null ||
      integrationRef.value === null
    ) {
      return;
    }

    groupedFeaturesRef.value = await workerRef.value.readGroupedFeatures(
      fileRef.value,
      bandRef.value,
      integrationRef.value,
    );
  });

  return {
    groupedFeaturesRef: groupedFeaturesRef,
  };
}
