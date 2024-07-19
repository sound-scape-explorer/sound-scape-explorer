import {useBandSelection} from 'src/composables/use-band-selection';
import {watch} from 'vue';

export function useBandLifecycles() {
  const {selected, options, handleChange, autoselect} = useBandSelection();

  watch(selected, handleChange);
  watch(options, autoselect);
}
