import {reactive, watchEffect} from 'vue';
import {storageFileRef} from './useStorageFile';
import {workerRef} from './useWorker';
import {bandRef} from './useBands';
import {integrationRef} from './useIntegrations';

// Label properties and sets
export interface Labels {
  [property: string]: string[];
}

interface LabelsRef {
  value: Labels | null;
}

export const labelsRef = reactive<LabelsRef>({
  value: null,
});

export function useLabels() {
  const readLabels = async () => {
    if (
      storageFileRef.value === null ||
      workerRef.value === null ||
      bandRef.value === null ||
      integrationRef.value === null
    ) {
      return;
    }

    labelsRef.value = await workerRef.value.readLabels(
      storageFileRef.value,
      bandRef.value.name,
      integrationRef.value.seconds,
    );
  };

  watchEffect(readLabels);
}
