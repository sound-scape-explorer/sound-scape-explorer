import {reactive, watchEffect} from 'vue';
import {fileRef} from './useFile';
import {workerRef} from './useWorker';
import {configBandRef} from './useConfigBands';
import {configIntegrationRef} from './useConfigIntegrations';

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
      configBandRef.value === null ||
      configIntegrationRef.value === null
    ) {
      return;
    }

    groupedTimestampsRef.value = await workerRef.value.readGroupedTimestamps(
      fileRef.value,
      configBandRef.value.name,
      configIntegrationRef.value.duration,
    );
  };

  watchEffect(readGroupedTimestamps);
}
