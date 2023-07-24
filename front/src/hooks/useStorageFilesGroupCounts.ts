import {reactive, watchEffect} from 'vue';
import {workerRef} from './useWorker';
import {fileRef} from './useFile';
import {configIntegrationRef} from './useConfigIntegrations';

interface FilesGroupCountsRef {
  value: number[] | null;
}

export const filesGroupCountsRef = reactive<FilesGroupCountsRef>({
  value: null,
});

export function useStorageFilesGroupCounts() {
  const readGroupCounts = async () => {
    if (
      workerRef.value === null ||
      fileRef.value === null ||
      configIntegrationRef.value === null
    ) {
      return;
    }

    filesGroupCountsRef.value = await workerRef.value.readFilesGroupCounts(
      fileRef.value,
      configIntegrationRef.value.duration,
    );
  };

  watchEffect(readGroupCounts);
}
