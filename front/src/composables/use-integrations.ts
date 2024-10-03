import {type DropdownOption} from 'src/common/dropdown-option';
import {useStorageReader} from 'src/composables/use-storage-reader';
import {ref} from 'vue';

export interface Integration {
  index: number;
  name: string;
  seconds: number;
}

const integrations = ref<Integration[] | null>(null);
const options = ref<DropdownOption[]>([]);

export function useIntegrations() {
  const {read: r} = useStorageReader();

  const read = async () => {
    await r(async (worker, file) => {
      integrations.value = await worker.readIntegrations(file);
    });
  };

  return {
    integrations: integrations,
    options: options,
    read: read,
  };
}
