import {
  type Extractor,
  useStorageExtractors,
} from 'src/composables/storage-extractors';
import {reducerSelectedRef} from 'src/hooks/useReducers';
import {parseSelectionOption} from 'src/utils/parse-selection-option';
import {ref, watchEffect} from 'vue';

const extractor = ref<Extractor | null>(null);
const selected = ref<Extractor['name'] | null>(null);

export function useExtractorSelection() {
  const {extractors, options: options} = useStorageExtractors();

  const select = (index: number) => {
    if (extractors.value === null || extractor.value !== null) {
      return;
    }

    extractor.value = extractors.value.filter((ex) => ex.index === index)[0];
  };

  const reset = () => {
    extractor.value = null;
    selected.value = null;
  };

  const handleSelectedChange = () => {
    if (selected.value === null) {
      return;
    }

    const extractorIndex = parseSelectionOption(selected.value);

    if (extractorIndex === null) {
      return;
    }

    select(extractorIndex);
  };

  watchEffect(handleSelectedChange);

  const autoSelect = () => {
    if (reducerSelectedRef.value === null) {
      return;
    }

    selected.value = options.value[0].value;
  };

  watchEffect(autoSelect);

  return {
    extractor: extractor,
    selected: selected,
    select: select,
    reset: reset,
  };
}
