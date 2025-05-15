import {useTagUniques} from 'src/composables/use-tag-uniques';
import {useColorSelection} from 'src/draggables/colors/use-color-selection';
import {type TagProps} from 'src/draggables/tags/Tag.vue';
import {useTagSelection} from 'src/draggables/tags/use-tag-selection';
import {computed, ref} from 'vue';

export function useTag(props: TagProps) {
  const {allUniques} = useTagUniques();
  const {updateSelection, selection} = useTagSelection();
  const {criteria} = useColorSelection();

  const isShowing = ref<boolean>(false);
  const isCurrent = computed<boolean>(() => criteria.value === props.name);

  const hasNoSelection = computed<boolean>(() => {
    if (!selection.value[props.name]) {
      return true;
    }

    return selection.value[props.name].length === 0;
  });

  const toggleShowing = () => (isShowing.value = !isShowing.value);
  const openCurrent = () => {
    if (isCurrent.value && !isShowing.value) {
      isShowing.value = true;
    }
  };

  const invertSelection = () => {
    const oldSelection = selection.value[props.name];
    const uniques = allUniques.value[props.name];

    const reverseSelection = [];

    for (const unique of uniques) {
      if (oldSelection.includes(unique)) {
        continue;
      }

      reverseSelection.push(unique);
    }

    updateSelection(props.name, reverseSelection);
  };

  const resetSelection = (tagName: string) => {
    if (selection.value[tagName].length === 0) {
      return;
    }

    updateSelection(tagName, []);
  };

  return {
    invertSelection,
    resetSelection,
    hasNoSelection,
    isShowing,
    toggleShowing,
    isCurrent,
    openCurrent,
  };
}
