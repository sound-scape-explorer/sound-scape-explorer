import {useIntervals} from 'src/composables/use-intervals';
import {type LabelSets, useLabelSets} from 'src/composables/use-label-sets';
import {STRING_DELIMITER} from 'src/constants';
import {type LabelSelection} from 'src/draggables/labels/use-label-selection';
import {type Ref, ref} from 'vue';

// by interval indexes
const filtered = ref<boolean[]>([]);

export function useScatterFilterLabels() {
  const {sets} = useLabelSets();
  const {intervals} = useIntervals();

  /**
   * return true to continue
   * return false to break
   */
  const iterateLabels = (
    sets: LabelSets,
     
    callback: (p: number, property: string) => boolean,
  ) => {
    const properties = Object.keys(sets);
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

    const interval = intervals.value[intervalIndex];

    iterateLabels(sets.value, (p, property) => {
      const selected = selection.value[property];
      const values = interval.labels[property].join(STRING_DELIMITER);

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
    const l = intervals.value.length;
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
    filtered,
    filter,
    reset,
  };
}
