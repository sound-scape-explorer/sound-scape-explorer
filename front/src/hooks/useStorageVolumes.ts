import {reactive, watchEffect} from 'vue';
import {workerRef} from './useWorker';
import type {StorageVolume} from './useStorageVolume';
import {fileRef} from './useFile';
import {configBandRef} from './useConfigBands';
import {configIntegrationRef} from './useConfigIntegrations';

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
      configBandRef.value === null ||
      configIntegrationRef.value === null
    ) {
      return;
    }

    volumesRef.value = await workerRef.value.readVolumes(
      fileRef.value,
      configBandRef.value.name,
      configIntegrationRef.value.duration,
    );
  };

  watchEffect(readVolumes);
}
