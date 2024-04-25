import type {Digester} from 'src/composables/storage-digesters';
import {useStorageReader} from 'src/composables/storage-reader';
import {integrationRef} from 'src/hooks/useIntegrations';
import {reactive} from 'vue';

import {useBandSelection} from '../../composables/band-selection';

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
  const {read} = useStorageReader();
  const {band} = useBandSelection();

  const readDigested = (digester: Digester) =>
    read(async (worker, file) => {
      if (band.value === null || integrationRef.value === null) {
        return;
      }

      const values = await worker.readDigested(
        file,
        band.value.name,
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
