import {fileRef} from './useFile';
import {workerRef} from './useWorker';
import {configBandRef} from './useConfigBands';
import {configIntegrationRef} from './useConfigIntegrations';

export function useStorageMatrix() {
  const readMatrix = async (
    matrixIndex: number,
    metaIndex: number,
  ): Promise<number[][] | null> => {
    if (
      workerRef.value === null ||
      fileRef.value === null ||
      configBandRef.value === null ||
      configIntegrationRef.value === null
    ) {
      return null;
    }

    const values = await workerRef.value.readMatrix(
      fileRef.value,
      configBandRef.value.name,
      configIntegrationRef.value.duration,
      matrixIndex,
      metaIndex,
    );

    return values;
  };

  return {
    readMatrix: readMatrix,
  };
}
