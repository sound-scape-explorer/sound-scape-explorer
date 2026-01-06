import {useTagCheckboxHandlers} from 'src/draggables/tags/use-tag-checkbox-handlers';
import {useTagSelection} from 'src/draggables/tags/use-tag-selection';
import {type Ref, watch} from 'vue';

export function useTagCheckboxLifecycles(
  tagName: string,
  checkboxes: Ref<string[]>,
) {
  const {selection} = useTagSelection();
  const {handleUpdate, syncBack} = useTagCheckboxHandlers(tagName, checkboxes);

  watch(selection, syncBack);
  watch(checkboxes, handleUpdate);
}
