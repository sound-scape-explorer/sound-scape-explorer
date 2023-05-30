import {workerRef} from './useWorker';
import {fileRef} from './useFile';
import {bandRef} from './useBand';
import {integrationRef} from './useIntegration';
import {onMounted, reactive} from 'vue';

interface SlicesPerGroupRef {
  value: number | null;
}

export const slicesPerGroupRef = reactive<SlicesPerGroupRef>({
  value: null,
});

export function useStorageSlicesPerGroup() {
  onMounted(async () => {
    if (
      workerRef.value === null ||
      fileRef.value === null ||
      bandRef.value === null ||
      integrationRef.value === null
    ) {
      return;
    }

    slicesPerGroupRef.value = await workerRef.value.getSlicesPerGroup(
      fileRef.value,
      bandRef.value,
      integrationRef.value,
    );
  });
}
