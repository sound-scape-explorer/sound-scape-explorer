import {storageFileRef} from './useStorageFile';
import {workerRef} from './useWorker';
import {bandRef} from './useBands';
import {integrationRef} from './useIntegrations';

export function useStoragePairing() {
  const readPairing = async (
    pairingIndex: number,
    metaIndexA: number,
    metaIndexB: number,
  ): Promise<number[][] | null> => {
    if (
      workerRef.value === null ||
      storageFileRef.value === null ||
      bandRef.value === null ||
      integrationRef.value === null
    ) {
      return null;
    }

    // const values = await workerRef.value.readPairing(
    //   storageFileRef.value,
    //   bandRef.value.name,
    //   integrationRef.value.seconds,
    //   pairingIndex,
    //   metaIndexA,
    //   metaIndexB,
    // );
    //
    // return values;
  };

  return {
    readPairing: readPairing,
  };
}
