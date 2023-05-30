import {bandRef} from './useBand';
import {integrationRef} from './useIntegration';
import {fileRef} from './useFile';
import {workerRef} from './useWorker';

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
      bandRef.value === null ||
      integrationRef.value === null
    ) {
      return null;
    }

    const values = await workerRef.value.readVolume(
      fileRef.value,
      bandRef.value,
      integrationRef.value,
      volumeIndex,
      metaIndex,
    );

    return values;
  };

  return {
    readVolume: readVolume,
  };
}
