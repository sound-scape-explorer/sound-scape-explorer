import {useStorageLabels} from 'src/composables/use-storage-labels';
import {useColorSelection} from 'src/draggables/colors/use-color-selection';
import {type LabelProps} from 'src/draggables/labels/label.vue';
import {useLabelSelection} from 'src/draggables/labels/use-label-selection';
import {computed, ref} from 'vue';

export function useLabel(props: LabelProps) {
  const {labels} = useStorageLabels();
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
    if (labels.value === null) {
      return;
    }

    const oldSelection = selection.value[props.property];
    const uniques = labels.value[props.property];

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
    invertSelection: invertSelection,
    resetSelection: resetSelection,
    hasNoSelection: hasNoSelection,
    isShowing: isShowing,
    toggleShowing: toggleShowing,
    isCurrent: isCurrent,
    openCurrent: openCurrent,
  };
}
