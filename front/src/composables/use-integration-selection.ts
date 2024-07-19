import {useIntegrationOptions} from 'src/composables/use-integration-options';
import {
  type Integration,
  useIntegrations,
} from 'src/composables/use-integrations';
import {useViewSelectionPrimitive} from 'src/composables/use-view-selection-primitive';
import {ref} from 'vue';

const integration = ref<Integration | null>(null);
const selected = ref<Integration['name'] | null>(null);

export function useIntegrationSelection() {
  const {integrations} = useIntegrations();
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

  return {
    integration: integration,
    selected: selected,
    select: select,
    reset: reset,
    options: options,
    autoselect: autoselect,
    handleChange: handleChange,
  };
}
