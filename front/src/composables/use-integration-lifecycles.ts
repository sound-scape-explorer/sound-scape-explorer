import {useIntegrationSelection} from 'src/composables/use-integration-selection';
import {watch} from 'vue';

export function useIntegrationLifecycles() {
  const {selected, options, handleChange, autoselect} =
    useIntegrationSelection();

  watch(selected, handleChange);
  watch(options, autoselect);
}
