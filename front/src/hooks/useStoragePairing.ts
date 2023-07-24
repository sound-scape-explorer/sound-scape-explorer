import {fileRef} from './useFile';
import {workerRef} from './useWorker';
import {configBandRef} from './useConfigBands';
import {configIntegrationRef} from './useConfigIntegrations';

export function useStoragePairing() {
  const readPairing = (
    pairingIndex: number,
    metaIndexA: number,
    metaIndexB: number,
  ) => {
    if (
      workerRef.value === null ||
      fileRef.value === null ||
      configBandRef.value === null ||
      configIntegrationRef.value === null
    ) {
      return null;
    }

    const values = workerRef.value.readPairing(
      fileRef.value,
      configBandRef.value.name,
      configIntegrationRef.value.duration,
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
