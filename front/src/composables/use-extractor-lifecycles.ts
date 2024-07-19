import {useExtractorSelection} from 'src/composables/use-extractor-selection';
import {watch} from 'vue';

export function useExtractorLifecycles() {
  const {selected, options, handleChange, autoselect} = useExtractorSelection();

  watch(selected, handleChange);
  watch(options, autoselect);
}
