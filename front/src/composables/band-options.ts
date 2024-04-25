import type {DropdownOption} from 'src/common/dropdown-option';
import type {Band} from 'src/composables/band-storage';
import {convertToNaiveSelectOptions} from 'src/utils/convert-to-naive-select-options';
import {ref} from 'vue';

const options = ref<DropdownOption[]>([]);

export function useBandOptions() {
  const create = (bands: Band[]) => {
    const o = bands.map(
      (b) => `${b.index} - ${b.name} (${b.low} Hz - ${b.high} Hz)`,
    );

    options.value = convertToNaiveSelectOptions(o);
  };

  return {
    options: options,
    create: create,
  };
}
