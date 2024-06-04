import type {DropdownOption} from 'src/common/dropdown-option';
import {useStorageReader} from 'src/composables/storage-reader';
import {useStorageReady} from 'src/composables/storage-ready';
import {ref, watch} from 'vue';

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
  const {isReady} = useStorageReady();

  const readIntegrations = async () => {
    if (!isReady.value) {
      return;
    }

    if (isLoaded) {
      return;
    }

    isLoaded = true;

    await read(async (worker, file) => {
      integrations.value = await worker.readIntegrations(file);
    });
  };

  watch(isReady, readIntegrations);

  return {
    integrations: integrations,
    options: options,
  };
}
