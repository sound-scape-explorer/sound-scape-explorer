import {useStorageLabels} from 'src/composables/use-storage-labels';
import {type DraggableLabelsItemContentProps} from 'src/draggables/labels/draggable-labels-item-content.vue';
import {useLabelsSelection} from 'src/draggables/labels/use-labels-selection';

export function useLabelsItem(props: DraggableLabelsItemContentProps) {
  const {labels} = useStorageLabels();
  const {updateSelection, selection} = useLabelsSelection();

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
