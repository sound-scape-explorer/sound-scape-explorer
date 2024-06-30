import type {SelectMixedOption} from 'naive-ui/es/select/src/interface';
import type {Integration} from 'src/composables/use-integration-storage';
import {convertToNaiveSelectOptions} from 'src/utils/convert-to-naive-select-options';
import {ref} from 'vue';

const options = ref<SelectMixedOption[]>([]);

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
