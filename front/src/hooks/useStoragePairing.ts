import {bandRef} from './useBand';
import {integrationRef} from './useIntegration';
import {fileRef} from './useFile';
import {workerRef} from './useWorker';

export function useStoragePairing() {
  const readPairing = (
    pairingIndex: number,
    metaIndexA: number,
    metaIndexB: number,
  ) => {
    if (
      workerRef.value === null ||
      fileRef.value === null ||
      bandRef.value === null ||
      integrationRef.value === null
    ) {
      return null;
    }

    const values = workerRef.value.readPairing(
      fileRef.value,
      bandRef.value,
      integrationRef.value,
      pairingIndex,
      metaIndexA,
      metaIndexB,
    );

    return values;
  };

  return {
    readPairing: readPairing,
  };
}
