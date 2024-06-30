import {useIntegrationOptions} from 'src/composables/use-integration-options';
import {
  type Integration,
  useIntegrationStorage,
} from 'src/composables/use-integration-storage';
import {ref, watch} from 'vue';

import {parseSelectionOption} from '../utils/parse-selection-option';

const integration = ref<Integration | null>(null);
const selected = ref<Integration['name'] | null>(null);
let hasAutoSelected = false;

export function useIntegrationSelection() {
  const {integrations} = useIntegrationStorage();
  const {options} = useIntegrationOptions();

  const select = (index: number) => {
    if (integrations.value === null || integration.value !== null) {
      return;
    }

    integration.value = integrations.value.filter((i) => i.index === index)[0];
  };

  const reset = () => {
    integration.value = null;
    selected.value = null;
    hasAutoSelected = false;
  };

  const handleChange = () => {
    if (selected.value === null) {
      return;
    }

    const index = parseSelectionOption(selected.value);

    if (index === null) {
      return;
    }

    select(index);
  };

  watch(selected, handleChange);

  const autoselect = () => {
    if (hasAutoSelected || options.value.length !== 1) {
      return;
    }

    hasAutoSelected = true;
    selected.value = options.value[0].value;
  };

  watch(options, autoselect);

  return {
    integration: integration,
    selected: selected,
    select: select,
    reset: reset,
  };
}
