import {useReducerSelection} from 'src/composables/use-reducer-selection';
import {watch} from 'vue';

export function useReducerLifecycles() {
  const {selected, options, handleChange, autoselect} = useReducerSelection();

  watch(selected, handleChange);
  watch(options, autoselect);
}
