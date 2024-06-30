import {useExtractorOptions} from 'src/composables/use-extractor-options';
import {
  type Extractor,
  useExtractorStorage,
} from 'src/composables/use-extractor-storage';
import {parseSelectionOption} from 'src/utils/parse-selection-option';
import {ref, watch} from 'vue';

const extractor = ref<Extractor | null>(null);
const selected = ref<Extractor['name'] | null>(null);
let hasAutoSelected = false;

export function useSelectExtractor() {
  const {extractors} = useExtractorStorage();
  const {options} = useExtractorOptions();

  const select = (index: number) => {
    if (extractors.value === null || extractor.value !== null) {
      return;
    }

    extractor.value = extractors.value.filter((ex) => ex.index === index)[0];
  };

  const reset = () => {
    extractor.value = null;
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
    extractor: extractor,
    selected: selected,
    select: select,
    reset: reset,
  };
}
