import type {DropdownOption} from 'src/common/dropdown-option';
import type {Reducer} from 'src/composables/reducer-storage';
import {convertToNaiveSelectOptions} from 'src/utils/convert-to-naive-select-options';
import {ref} from 'vue';

const options = ref<DropdownOption[]>([]);

export function useReducerOptions() {
  const create = (reducers: Reducer[]) => {
    const o = reducers.map((r) => `${r.index} - ${r.name} (${r.dimensions}d)`);
    options.value = convertToNaiveSelectOptions(o);
  };

  return {
    options: options,
    create: create,
  };
}
