import {reactive, watchEffect} from 'vue';
import {workerRef} from './useWorker';
import {fileRef} from './useFile';
import {bandRef} from './useBand';
import {integrationRef} from './useIntegration';

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
      bandRef.value === null ||
      integrationRef.value === null
    ) {
      return;
    }

    groupedFilenamesRef.value = await workerRef.value.readGroupedFilenames(
      fileRef.value,
      integrationRef.value,
    );
  };

  watchEffect(readGroupedFilenames);
}
