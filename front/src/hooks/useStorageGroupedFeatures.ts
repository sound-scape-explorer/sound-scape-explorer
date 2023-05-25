import {onMounted, reactive} from 'vue';
import {bandRef} from './useBand';
import {integrationRef} from './useIntegration';
import {fileRef} from './useFile';
import {workerRef} from './useWorker';

interface GroupedFeaturesRef {
  value: number[][] | null;
}

export const groupedFeaturesRef = reactive<GroupedFeaturesRef>({
  value: null,
});

export function useStorageGroupedFeatures() {
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
}
