import {onMounted, reactive} from 'vue';
import {fileRef} from './useFile';
import {workerRef} from './useWorker';
import {integrationRef} from './useIntegration';
import {bandRef} from './useBand';

export interface StorageMetas {
  [property: string]: string[];
}

interface MetasRef {
  value: StorageMetas | null;
}

export const metasRef = reactive<MetasRef>({
  value: null,
});

export function useStorageMetas() {
  onMounted(async () => {
    // watch([bandRef, integrationRef], async () => {
    if (
      fileRef.value === null ||
      workerRef.value === null ||
      bandRef.value === null ||
      integrationRef.value === null
    ) {
      console.log('a');
      return;
    }

    metasRef.value = await workerRef.value.readMetas(
      fileRef.value,
      bandRef.value,
      integrationRef.value,
    );

    // setMetaProperties(metasRef.value);
    // setMetaSets(metasRef.value);
  });
}
