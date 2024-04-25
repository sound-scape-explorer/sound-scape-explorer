import {type Band, useStorageBands} from 'src/composables/storage-bands';
import {ref, watchEffect} from 'vue';

import {reducerSelectedRef} from '../hooks/useReducers';
import {parseSelectionOption} from '../utils/parse-selection-option';

const band = ref<Band | null>(null);
const selected = ref<Band['name'] | null>(null);

export function useSelectBand() {
  const {bands, options} = useStorageBands();

  const select = (index: number) => {
    if (bands.value === null || band.value !== null) {
      return;
    }

    band.value = bands.value.filter((band) => band.index === index)[0];
  };

  const reset = () => {
    band.value = null;
    selected.value = null;
  };

  const handleSelectedChange = () => {
    if (selected.value === null) {
      return;
    }

    const bandIndex = parseSelectionOption(selected.value);

    if (bandIndex === null) {
      return;
    }

    select(bandIndex);
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
    band: band,
    selected: selected,
    select: select,
    reset: reset,
  };
}
