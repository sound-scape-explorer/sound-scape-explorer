import {storageFileRef} from './useStorageFile';
import {workerRef} from './useWorker';
import {bandRef} from './useBands';
import {integrationRef} from './useIntegrations';

export function useStorageMatrix() {
  const readMatrix = async (
    matrixIndex: number,
    metaIndex: number,
  ): Promise<number[][] | null> => {
    if (
      workerRef.value === null ||
      storageFileRef.value === null ||
      bandRef.value === null ||
      integrationRef.value === null
    ) {
      return null;
    }

    // const values = await workerRef.value.readMatrix(
    //   storageFileRef.value,
    //   bandRef.value.name,
    //   integrationRef.value.seconds,
    //   matrixIndex,
    //   metaIndex,
    // );
    //
    // return values;
  };

  return {
    readMatrix: readMatrix,
  };
}
