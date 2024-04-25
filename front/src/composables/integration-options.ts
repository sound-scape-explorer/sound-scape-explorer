import type {DropdownOption} from 'src/common/dropdown-option';
import type {Integration} from 'src/composables/integration-storage';
import {convertToNaiveSelectOptions} from 'src/utils/convert-to-naive-select-options';
import {ref} from 'vue';

const options = ref<DropdownOption[]>([]);

export function useIntegrationOptions() {
  const create = (integrations: Integration[]) => {
    const o = integrations.map(
      (i) => `${i.index} - ${i.name} (${i.seconds} s)`,
    );

    options.value = convertToNaiveSelectOptions(o);
  };

  return {
    options: options,
    create: create,
  };
}
