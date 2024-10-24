import {useLabelSelection} from 'src/draggables/labels/use-label-selection';
import {type Ref} from 'vue';

export function useLabelCheckboxesHandlers(
  property: string,
  checkboxes: Ref<string[]>,
) {
  const {updateSelection, selection} = useLabelSelection();

  const handleUpdate = () => {
    if (typeof checkboxes.value === 'undefined') {
      return;
    }

    updateSelection(property, checkboxes.value);
  };

  const syncBack = () => {
    if (checkboxes.value === selection.value[property]) {
      return;
    }

    checkboxes.value = selection.value[property];
  };

  return {
    handleUpdate: handleUpdate,
    syncBack: syncBack,
  };
}
