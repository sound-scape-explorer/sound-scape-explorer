import {useBandSelection} from 'src/composables/use-band-selection';
import type {Digester} from 'src/composables/use-digesters';
import {useIntegrationSelection} from 'src/composables/use-integration-selection';
import {useStorageReader} from 'src/composables/use-storage-reader';
import {ref} from 'vue';

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

const digested = ref<Digested | null>(null);

export function useStorageDigested() {
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

      digested.value = {
        digester: digester,
        isPairing: isPairing,
        values: values,
      };
    });

  return {
    digested: digested,
    readDigested: readDigested,
  };
}
