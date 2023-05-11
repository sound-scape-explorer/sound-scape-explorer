import {onMounted, reactive} from 'vue';
import {bandRef} from './useBand';
import {integrationRef} from './useIntegration';
import {fileRef} from './useFile';
import {workerRef} from './useWorker';

type StorageGroupedMetas = string[][];

interface GroupedMetasRef {
  value: StorageGroupedMetas | null;
}

export const groupedMetasRef = reactive<GroupedMetasRef>({
  value: null,
});

export function useStorageGroupedMetas() {
  onMounted(async () => {
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
  });
}
