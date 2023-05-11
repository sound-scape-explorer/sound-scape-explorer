import {workerRef} from './useWorker';
import {fileRef} from './useFile';
import {bandRef} from './useBand';
import {integrationRef} from './useIntegration';
import {ref, watch} from 'vue';

type GroupedFilenamesRef = string[];

export function useStorageGroupedFilenames() {
  const groupedFilenamesRef = ref<GroupedFilenamesRef | null>(null);

  watch([workerRef, fileRef, bandRef, integrationRef], async () => {
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
      bandRef.value,
      integrationRef.value,
    );
  });

  return {
    groupedFilenamesRef: groupedFilenamesRef,
  };
}
