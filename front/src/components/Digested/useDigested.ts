import {bandRef} from 'src/hooks/useBands';
import type {Digester} from 'src/hooks/useDigesters';
import {integrationRef} from 'src/hooks/useIntegrations';
import {reactive} from 'vue';

import {useFileReader} from '../../hooks/file-reader';

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
  const {read} = useFileReader();

  const readDigested = (digester: Digester) =>
    read(async (worker, storage) => {
      if (bandRef.value === null || integrationRef.value === null) {
        return;
      }

      const values = await worker.readDigested(
        storage,
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
    });

  return {
    readDigested: readDigested,
  };
}
