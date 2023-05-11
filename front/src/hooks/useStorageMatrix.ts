import {bandRef} from './useBand';
import {integrationRef} from './useIntegration';
import {fileRef} from './useFile';
import {workerRef} from './useWorker';

export function useStorageMatrix() {
  const readMatrix = async (matrixIndex: number, metaIndex: number) => {
    if (
      workerRef.value === null ||
      fileRef.value === null ||
      bandRef.value === null ||
      integrationRef.value === null
    ) {
      return null;
    }

    const values = await workerRef.value.readMatrix(
      fileRef.value,
      bandRef.value,
      integrationRef.value,
      matrixIndex,
      metaIndex,
    );

    return values;
  };

  return {
    readMatrix: readMatrix,
  };
}
