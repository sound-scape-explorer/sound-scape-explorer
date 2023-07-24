import {reactive, watchEffect} from 'vue';
import {workerRef} from './useWorker';
import {fileRef} from './useFile';
import {configIntegrationRef} from './useConfigIntegrations';

interface GroupedFilenamesRef {
  value: string[] | null;
}

export const groupedFilenamesRef = reactive<GroupedFilenamesRef>({
  value: null,
});

export function useStorageGroupedFilenames() {
  const readGroupedFilenames = async () => {
    if (
      workerRef.value === null ||
      fileRef.value === null ||
      configIntegrationRef.value === null
    ) {
      return;
    }

    groupedFilenamesRef.value = await workerRef.value.readGroupedFilenames(
      fileRef.value,
      configIntegrationRef.value.duration,
    );
  };

  watchEffect(readGroupedFilenames);
}
