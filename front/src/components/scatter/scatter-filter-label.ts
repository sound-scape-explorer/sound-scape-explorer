import {useStorageAggregatedLabels} from 'src/composables/storage-aggregated-labels';
import {useStorageLabels} from 'src/composables/storage-labels';
import {type LabelSelection} from 'src/draggables/label/label-selection';
import {type Ref, ref} from 'vue';

// by interval indexes
const filtered = ref<boolean[]>([]);

// todo: fix performance loss
export function useScatterFilterLabel() {
  const {labels} = useStorageLabels();
  const {aggregatedLabels} = useStorageAggregatedLabels();

  const isVisible = (
    intervalIndex: number,
    newSelection: Ref<LabelSelection>,
  ): boolean => {
    let isVisible = true;

    if (aggregatedLabels.value === null || labels.value === null) {
      return false;
    }

    const properties = Object.keys(labels.value);
    const values = aggregatedLabels.value[intervalIndex];
    const valuesIndexes = Object.keys(values);

    for (let index = 0; index < valuesIndexes.length; index += 1) {
      // item is already not visible
      if (!isVisible) {
        break;
      }

      const property = properties[index];
      const valuesSelection = newSelection.value[property];

      // no user selection
      if (valuesSelection.length === 0) {
        continue;
      }

      const value = values[index];
      isVisible = valuesSelection.includes(value);
    }

    return isVisible;
  };

  const filter = (newSelection: Ref<LabelSelection>) => {
    console.log('filter by labels');
    if (aggregatedLabels.value === null) {
      return;
    }

    const pointsFilteredByMeta = [];

    for (
      let intervalIndex = 0;
      intervalIndex < aggregatedLabels.value.length;
      ++intervalIndex
    ) {
      const isFiltered = !isVisible(intervalIndex, newSelection);
      pointsFilteredByMeta.push(isFiltered);
    }

    filtered.value = pointsFilteredByMeta;
  };

  const reset = () => {
    filtered.value = [];
  };

  return {
    filtered: filtered,
    filter: filter,
    reset: reset,
  };
}
