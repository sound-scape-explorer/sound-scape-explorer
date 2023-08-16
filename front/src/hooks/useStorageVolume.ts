import {storageFileRef} from './useStorageFile';
import {workerRef} from './useWorker';
import {bandRef} from './useBands';
import {integrationRef} from './useIntegrations';

export interface StorageVolume {
  index: number;
  name: string;
  values: number[];
}

export function useStorageVolume() {
  const readVolume = async (volumeIndex: number, metaIndex: number) => {
    if (
      workerRef.value === null ||
      storageFileRef.value === null ||
      bandRef.value === null ||
      integrationRef.value === null
    ) {
      return null;
    }

    // const values = await workerRef.value.readVolume(
    //   storageFileRef.value,
    //   bandRef.value.name,
    //   integrationRef.value.seconds,
    //   volumeIndex,
    //   metaIndex,
    // );
    //
    // return values;
  };

  return {
    readVolume: readVolume,
  };
}
