import {useBandOptions} from 'src/composables/use-band-options';
import {type Band, useBands} from 'src/composables/use-bands';
import {useViewSelectionPrimitive} from 'src/composables/use-view-selection-primitive';
import {ref} from 'vue';

const band = ref<Band | null>(null);
const selected = ref<Band['name'] | null>(null);

export function useBandSelection() {
  const {bands} = useBands();
  const {options} = useBandOptions();
  const {
    reset: resetPrimitive,
    handleChange: handlePrimitive,
    autoselect: autoPrimitive,
  } = useViewSelectionPrimitive();

  const select = (index: number) => {
    if (bands.value === null || band.value !== null) {
      return;
    }

    band.value = bands.value.filter((b) => b.index === index)[0];
  };

  const reset = () => resetPrimitive(band, selected);
  const handleChange = () => handlePrimitive(selected.value, select);
  const autoselect = () => autoPrimitive(selected, options);

  return {
    band: band,
    selected: selected,
    select: select,
    reset: reset,
    options: options,
    autoselect: autoselect,
    handleChange: handleChange,
  };
}
