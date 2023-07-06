import {reactive, watchEffect} from 'vue';
import {bandRef} from './useBand';
import {integrationRef} from './useIntegration';
import {fileRef} from './useFile';
import {workerRef} from './useWorker';

export type StorageGroupedTimestamps = number[];

interface GroupedTimestampsRef {
  value: StorageGroupedTimestamps | null;
}

export const groupedTimestampsRef = reactive<GroupedTimestampsRef>({
  value: null,
});

export function useStorageGroupedTimestamps() {
  const readGroupedTimestamps = async () => {
    if (
      workerRef.value === null ||
      fileRef.value === null ||
      bandRef.value === null ||
      integrationRef.value === null
    ) {
      return;
    }

    groupedTimestampsRef.value = await workerRef.value.readGroupedTimestamps(
      fileRef.value,
      bandRef.value,
      integrationRef.value,
    );
  };

  watchEffect(readGroupedTimestamps);
}
