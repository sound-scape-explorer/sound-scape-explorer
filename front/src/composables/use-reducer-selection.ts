import {useBandOptions} from 'src/composables/use-band-options';
import {useExtractorOptions} from 'src/composables/use-extractor-options';
import {useIntegrationOptions} from 'src/composables/use-integration-options';
import {useReducerOptions} from 'src/composables/use-reducer-options';
import {useReducers} from 'src/composables/use-reducers';
import {useViewSelectionPrimitive} from 'src/composables/use-view-selection-primitive';
import {type ReducerDtoWithObjects} from 'src/dtos';
import {ref} from 'vue';

const reducer = ref<ReducerDtoWithObjects | null>(null);
const selected = ref<ReducerDtoWithObjects['impl'] | null>(null);

export function useReducerSelection() {
  const {reducers} = useReducers();
  const {options} = useReducerOptions();
  const {create: createBandOptions} = useBandOptions();
  const {create: createIntegrationOptions} = useIntegrationOptions();
  const {create: createExtractorOptions} = useExtractorOptions();
  const {
    reset: resetPrimitive,
    handleChange: handlePrimitive,
    autoselect: autoPrimitive,
  } = useViewSelectionPrimitive();

  const select = (index: number) => {
    if (reducers.value === null || reducer.value !== null) {
      return;
    }

    reducer.value = reducers.value.filter((r) => r.index === index)[0];
    createBandOptions(reducer.value.bands);
    createIntegrationOptions(reducer.value.integrations);
    createExtractorOptions(reducer.value.extractors);
  };

  const reset = () => resetPrimitive(reducer, selected);
  const handleChange = () => handlePrimitive(selected.value, select);
  const autoselect = () => autoPrimitive(selected, options);

  return {
    reducer: reducer,
    selected: selected,
    select: select,
    reset: reset,
    options: options,
    autoselect: autoselect,
    handleChange: handleChange,
  };
}
