import {useStorageLabels} from 'src/composables/use-storage-labels';
import {type LabelProps} from 'src/draggables/labels/label.vue';
import {useLabelSelection} from 'src/draggables/labels/use-label-selection';

export function useLabel(props: LabelProps) {
  const {labels} = useStorageLabels();
  const {updateSelection, selection} = useLabelSelection();

  const handlePropertyClick = () => {
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

  const handlePropertyRightClick = (e: PointerEvent, property: string) => {
    e.preventDefault();

    if (selection.value[property].length === 0) {
      return;
    }

    updateSelection(property, []);
  };

  return {
    handlePropertyClick: handlePropertyClick,
    handlePropertyRightClick: handlePropertyRightClick,
  };
}
