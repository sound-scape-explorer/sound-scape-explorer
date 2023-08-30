import {bandRef} from 'src/hooks/useBands';
import type {Digester} from 'src/hooks/useDigesters';
import {integrationRef} from 'src/hooks/useIntegrations';
import {storageFileRef} from 'src/hooks/useStorageFile';
import {workerRef} from 'src/hooks/useWorker';
import {reactive} from 'vue';

export interface Digested {
  digester: Digester;
  isPairing: boolean;
  // keys are label properties indexes
  values: {
    [key: string]:
      | number[][]
      | {
          [subKey: string]: number[][];
        };
  };
}

interface DigestedRef {
  value: Digested | null;
}

export const digestedRef = reactive<DigestedRef>({
  value: null,
});

export function useDigested() {
  const readDigested = async (digester: Digester) => {
    if (
      workerRef.value === null ||
      storageFileRef.value === null ||
      bandRef.value === null ||
      integrationRef.value === null
    ) {
      return;
    }

    const values = await workerRef.value.readDigested(
      storageFileRef.value,
      bandRef.value.name,
      integrationRef.value.seconds,
      digester.index,
    );

    const isPairing = !Array.isArray(values[0]);

    digestedRef.value = {
      digester: digester,
      isPairing: isPairing,
      values: values,
    };
  };

  return {
    readDigested: readDigested,
  };
}
