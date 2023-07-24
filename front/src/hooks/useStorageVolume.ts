import {fileRef} from './useFile';
import {workerRef} from './useWorker';
import {configBandRef} from './useConfigBands';
import {configIntegrationRef} from './useConfigIntegrations';

export interface StorageVolume {
  index: number;
  name: string;
  values: number[];
}

export function useStorageVolume() {
  const readVolume = async (volumeIndex: number, metaIndex: number) => {
    if (
      workerRef.value === null ||
      fileRef.value === null ||
      configBandRef.value === null ||
      configIntegrationRef.value === null
    ) {
      return null;
    }

    const values = await workerRef.value.readVolume(
      fileRef.value,
      configBandRef.value.name,
      configIntegrationRef.value.duration,
      volumeIndex,
      metaIndex,
    );

    return values;
  };

  return {
    readVolume: readVolume,
  };
}
