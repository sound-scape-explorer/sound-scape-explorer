import {useLabelSets} from 'src/composables/use-label-sets';
import {useColorSelection} from 'src/draggables/colors/use-color-selection';
import {type LabelProps} from 'src/draggables/labels/label.vue';
import {useLabelSelection} from 'src/draggables/labels/use-label-selection';
import {computed, ref} from 'vue';

export function useLabel(props: LabelProps) {
  const {sets} = useLabelSets();
  const {updateSelection, selection} = useLabelSelection();
  const {criteria} = useColorSelection();

  const isShowing = ref<boolean>(false);
  const isCurrent = computed<boolean>(() => criteria.value === props.property);

  const hasNoSelection = computed<boolean>(() => {
    if (!selection.value[props.property]) {
      return true;
    }

    return selection.value[props.property].length === 0;
  });

  const toggleShowing = () => (isShowing.value = !isShowing.value);
  const openCurrent = () => {
    if (isCurrent.value && !isShowing.value) {
      isShowing.value = true;
    }
  };

  const invertSelection = () => {
    const oldSelection = selection.value[props.property];
    const uniques = sets.value[props.property];

    const reverseSelection = [];

    for (const unique of uniques) {
      if (oldSelection.includes(unique)) {
        continue;
      }

      reverseSelection.push(unique);
    }

    updateSelection(props.property, reverseSelection);
  };

  const resetSelection = (property: string) => {
    if (selection.value[property].length === 0) {
      return;
    }

    updateSelection(property, []);
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
