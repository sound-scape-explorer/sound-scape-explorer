import {useBandOptions} from 'src/composables/band-options';
import {useExtractorOptions} from 'src/composables/extractor-options';
import {useIntegrationOptions} from 'src/composables/integration-options';
import {useReducerOptions} from 'src/composables/reducer-options';
import {type Reducer, useReducerStorage} from 'src/composables/reducer-storage';
import {ref, watch} from 'vue';

import {parseSelectionOption} from '../utils/parse-selection-option';

const reducer = ref<Reducer | null>(null);
const selected = ref<Reducer['name'] | null>(null);
let hasAutoSelected = false;

export function useReducerSelection() {
  const {reducers} = useReducerStorage();
  const {options} = useReducerOptions();
  const {create: createBandOptions} = useBandOptions();
  const {create: createIntegrationOptions} = useIntegrationOptions();
  const {create: createExtractorOptions} = useExtractorOptions();

  const select = (index: number) => {
    if (reducers.value === null || reducer.value !== null) {
      return;
    }

    reducer.value = reducers.value.filter((r) => r.index === index)[0];
    createBandOptions(reducer.value.bands);
    createIntegrationOptions(reducer.value.integrations);
    createExtractorOptions(reducer.value.nnExtractors);
  };

  const reset = () => {
    reducer.value = null;
    selected.value = null;
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
    reducer: reducer,
    selected: selected,
    select: select,
    reset: reset,
  };
}
