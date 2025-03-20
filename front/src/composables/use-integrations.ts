import {type DropdownOption} from 'src/common/dropdown-option';
import {useStorageReader} from 'src/composables/use-storage-reader';
import {type IntegrationDto} from 'src/dtos';
import {ref} from 'vue';

const integrations = ref<IntegrationDto[] | null>(null);
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
