import {reactive, watchEffect} from 'vue';

import {integrationRef} from './useIntegrations';
import {storageFileRef} from './useStorageFile';
import {workerRef} from './useWorker';

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
      storageFileRef.value === null ||
      integrationRef.value === null
    ) {
      return;
    }

    // groupedFilenamesRef.value = await workerRef.value.readGroupedFilenames(
    //   storageFileRef.value,
    //   integrationRef.value.seconds,
    // );
  };

  watchEffect(readGroupedFilenames);
}
