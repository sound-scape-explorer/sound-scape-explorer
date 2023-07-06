import {reactive, watchEffect} from 'vue';
import {bandRef} from './useBand';
import {integrationRef} from './useIntegration';
import {fileRef} from './useFile';
import {workerRef} from './useWorker';

interface GroupedMetasRef {
  value: string[][] | null;
}

export const groupedMetasRef = reactive<GroupedMetasRef>({
  value: null,
});

export function useStorageGroupedMetas() {
  const readGroupedMetas = async () => {
    if (
      workerRef.value === null ||
      fileRef.value === null ||
      bandRef.value === null ||
      integrationRef.value === null
    ) {
      return;
    }

    groupedMetasRef.value = await workerRef.value.readGroupedMetas(
      fileRef.value,
      bandRef.value,
      integrationRef.value,
    );
  };

  watchEffect(readGroupedMetas);
}
