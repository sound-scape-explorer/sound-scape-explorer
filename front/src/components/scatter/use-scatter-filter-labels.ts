import {useStorageAggregatedLabels} from 'src/composables/use-storage-aggregated-labels';
import {
  type Labels,
  useStorageLabels,
} from 'src/composables/use-storage-labels';
import {type LabelSelection} from 'src/draggables/labels/use-label-selection';
import {type Ref, ref} from 'vue';

// by interval indexes
const filtered = ref<boolean[]>([]);

export function useScatterFilterLabels() {
  const {labels} = useStorageLabels();
  const {aggregatedLabels} = useStorageAggregatedLabels();

  /**
   * return true to continue
   * return false to break
   */
  const iterateLabels = (
    labels: Labels,
    // eslint-disable-next-line no-unused-vars
    callback: (p: number, property: string) => boolean,
  ) => {
    const properties = Object.keys(labels);
    const indices = properties.map((v, i) => i.toString());

    for (let p = 0; p < indices.length; p += 1) {
      const property = properties[p];
      const isContinue = callback(p, property);

      if (!isContinue) {
        break;
      }
    }
  };

  const isFilteredBySelection = (
    intervalIndex: number,
    selection: Ref<LabelSelection>,
  ): boolean => {
    let isFiltered = false;

    if (aggregatedLabels.value === null || labels.value === null) {
      return false;
    }

    const aggregated = aggregatedLabels.value[intervalIndex];

    iterateLabels(labels.value, (p, property) => {
      const selected = selection.value[property];
      const values = aggregated[p];

      // no user selection
      if (selected.length === 0) {
        return true;
      }

      // selected by user
      if (selected.includes(values)) {
        return true;
      }

      isFiltered = true;
      return false;
    });

    return isFiltered;
  };

  const filter = (newSelection: Ref<LabelSelection>) => {
    if (aggregatedLabels.value === null) {
      return;
    }

    const l = aggregatedLabels.value.length;
    const newFiltered: boolean[] = new Array(l);

    for (let i = 0; i < l; i += 1) {
      newFiltered[i] = isFilteredBySelection(i, newSelection);
    }

    filtered.value = newFiltered;
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
