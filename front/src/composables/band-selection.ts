import {useBandOptions} from 'src/composables/band-options';
import {type Band, useBandStorage} from 'src/composables/band-storage';
import {ref, watch} from 'vue';

import {parseSelectionOption} from '../utils/parse-selection-option';

const band = ref<Band | null>(null);
const selected = ref<Band['name'] | null>(null);
let hasAutoSelected = false;

export function useBandSelection() {
  const {bands} = useBandStorage();
  const {options} = useBandOptions();

  const select = (index: number) => {
    if (bands.value === null || band.value !== null) {
      return;
    }

    band.value = bands.value.filter((band) => band.index === index)[0];
  };

  const reset = () => {
    band.value = null;
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
    band: band,
    selected: selected,
    select: select,
    reset: reset,
  };
}
