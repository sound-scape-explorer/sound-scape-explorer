import {useBandSelection} from 'src/composables/band-selection';
import {useIntegrationSelection} from 'src/composables/integration-selection';
import type {Digester} from 'src/composables/storage-digesters';
import {useStorageReader} from 'src/composables/storage-reader';
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
  const {read} = useStorageReader();
  const {band} = useBandSelection();
  const {integration} = useIntegrationSelection();

  const readDigested = (digester: Digester) =>
    read(async (worker, file) => {
      if (band.value === null || integration.value === null) {
        return;
      }

      const values = await worker.readDigested(
        file,
        band.value.name,
        integration.value.seconds,
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
