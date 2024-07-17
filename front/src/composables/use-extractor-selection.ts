import {useExtractorOptions} from 'src/composables/use-extractor-options';
import {
  type Extractor,
  useExtractorStorage,
} from 'src/composables/use-extractor-storage';
import {useViewSelectionPrimitive} from 'src/composables/use-view-selection-primitive';
import {ref} from 'vue';

const extractor = ref<Extractor | null>(null);
const selected = ref<Extractor['name'] | null>(null);

export function useExtractorSelection() {
  const {extractors} = useExtractorStorage();
  const {options} = useExtractorOptions();
  const {
    reset: resetPrimitive,
    handleChange: handlePrimitive,
    autoselect: autoPrimitive,
  } = useViewSelectionPrimitive();

  const select = (index: number) => {
    if (extractors.value === null || extractor.value !== null) {
      return;
    }

    extractor.value = extractors.value.filter((ex) => ex.index === index)[0];
  };

  const reset = () => resetPrimitive(extractor, selected);
  const handleChange = () => handlePrimitive(selected.value, select);
  const autoselect = () => autoPrimitive(selected, options);

  return {
    extractor: extractor,
    selected: selected,
    select: select,
    reset: reset,
    options: options,
    handleChange: handleChange,
    autoselect: autoselect,
  };
}
