import {useTagSelection} from 'src/draggables/tags/use-tag-selection';
import {type Ref} from 'vue';

export function useTagCheckboxHandlers(
  tagName: string,
  checkboxes: Ref<string[]>,
) {
  const {update, selection} = useTagSelection();

  const handleUpdate = () => {
    if (typeof checkboxes.value === 'undefined') {
      return;
    }

    update(tagName, checkboxes.value);
  };

  const syncBack = () => {
    if (checkboxes.value === selection.value[tagName]) {
      return;
    }

    checkboxes.value = selection.value[tagName];
  };

  return {
    handleUpdate,
    syncBack,
  };
}
