import {useLabelCheckboxesHandlers} from 'src/draggables/labels/use-label-checkboxes-handlers';
import {useLabelSelection} from 'src/draggables/labels/use-label-selection';
import {type Ref, watch} from 'vue';

export function useLabelCheckboxesLifecycles(
  property: string,
  checkboxes: Ref<string[]>,
) {
  const {handleUpdate, syncBack} = useLabelCheckboxesHandlers(
    property,
    checkboxes,
  );
  const {selection} = useLabelSelection();

  watch(checkboxes, handleUpdate);
  watch(selection, syncBack);
}
