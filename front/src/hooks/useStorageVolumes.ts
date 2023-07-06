import {reactive, watchEffect} from 'vue';
import {workerRef} from './useWorker';
import {bandRef} from './useBand';
import {integrationRef} from './useIntegration';
import type {StorageVolume} from './useStorageVolume';
import {fileRef} from './useFile';

interface VolumesRef {
  value: StorageVolume[] | null;
}

export const volumesRef = reactive<VolumesRef>({
  value: null,
});

export function useStorageVolumes() {
  const readVolumes = async () => {
    if (
      workerRef.value === null ||
      fileRef.value === null ||
      bandRef.value === null ||
      integrationRef.value === null
    ) {
      return;
    }

    volumesRef.value = await workerRef.value.readVolumes(
      fileRef.value,
      bandRef.value,
      integrationRef.value,
    );
  };

  watchEffect(readVolumes);
}
