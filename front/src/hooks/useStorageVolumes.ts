import {reactive, watchEffect} from 'vue';
import {workerRef} from './useWorker';
import type {StorageVolume} from './useStorageVolume';
import {storageFileRef} from './useStorageFile';
import {bandRef} from './useBands';
import {integrationRef} from './useIntegrations';

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
      storageFileRef.value === null ||
      bandRef.value === null ||
      integrationRef.value === null
    ) {
      return;
    }

    // volumesRef.value = await workerRef.value.readVolumes(
    //   storageFileRef.value,
    //   bandRef.value.name,
    //   integrationRef.value.seconds,
    // );
  };

  watchEffect(readVolumes);
}
