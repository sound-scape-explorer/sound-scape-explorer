import {onMounted, reactive} from 'vue';
import {workerRef} from './useWorker';
import {fileRef} from './useFile';
import {integrationRef} from './useIntegration';

interface FilesGroupCountsRef {
  value: number[] | null;
}

export const filesGroupCountsRef = reactive<FilesGroupCountsRef>({
  value: null,
});

export function useStorageFilesGroupCounts() {
  onMounted(async () => {
    if (
      workerRef.value === null ||
      fileRef.value === null ||
      integrationRef.value === null
    ) {
      return;
    }

    filesGroupCountsRef.value = await workerRef.value.readFilesGroupCounts(
      fileRef.value,
      integrationRef.value,
    );
  });
}
