import type {DropdownOption} from 'src/common/dropdown-option';
import type {Extractor} from 'src/composables/extractor-storage';
import {convertToNaiveSelectOptions} from 'src/utils/convert-to-naive-select-options';
import {ref} from 'vue';

const options = ref<DropdownOption[]>([]);

export function useExtractorOptions() {
  const create = (extractors: Extractor[]) => {
    const o = extractors.map((ex) => `${ex.index} - ${ex.name}`);
    options.value = convertToNaiveSelectOptions(o);
  };

  return {
    options: options,
    create: create,
  };
}
