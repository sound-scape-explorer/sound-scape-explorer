import type {DropdownOption} from 'src/common/DropdownOption';
import {useStorageReader} from 'src/composables/storage-reader';
import {ref, watchEffect} from 'vue';

export interface Integration {
  index: number;
  name: string;
  seconds: number;
}

let isLoaded = false;
const integrations = ref<Integration[] | null>(null);
const options = ref<DropdownOption[]>([]);

export function useIntegrationStorage() {
  const {read} = useStorageReader();

  const readIntegrations = async () => {
    if (isLoaded) {
      return;
    }

    isLoaded = true;

    await read(async (worker, file) => {
      integrations.value = await worker.readIntegrations(file);
    });
  };

  watchEffect(readIntegrations);

  return {
    integrations: integrations,
    options: options,
  };
}
