import {useIntegrationOptions} from 'src/composables/use-integration-options';
import {
  type Integration,
  useIntegrationStorage,
} from 'src/composables/use-integration-storage';
import {useViewSelectionPrimitive} from 'src/composables/use-view-selection-primitive';
import {ref, watch} from 'vue';

const integration = ref<Integration | null>(null);
const selected = ref<Integration['name'] | null>(null);

export function useIntegrationSelection() {
  const {integrations} = useIntegrationStorage();
  const {options} = useIntegrationOptions();
  const {
    reset: resetPrimitive,
    handleChange: handlePrimitive,
    autoselect: autoPrimitive,
  } = useViewSelectionPrimitive();

  const select = (index: number) => {
    if (integrations.value === null || integration.value !== null) {
      return;
    }

    integration.value = integrations.value.filter((i) => i.index === index)[0];
  };

  const reset = () => resetPrimitive(integration, selected);
  const handleChange = () => handlePrimitive(selected.value, select);
  const autoselect = () => autoPrimitive(selected, options);

  watch(selected, handleChange);
  watch(options, autoselect);

  return {
    integration: integration,
    selected: selected,
    select: select,
    reset: reset,
  };
}
