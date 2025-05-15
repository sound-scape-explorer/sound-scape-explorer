import {useIntervals} from 'src/composables/use-intervals';
import {
  type AllTagUniques,
  useTagUniques,
} from 'src/composables/use-tag-uniques';
import {STRING_DELIMITER} from 'src/constants';
import {type TagSelection} from 'src/draggables/tags/use-tag-selection';
import {type Ref, ref} from 'vue';

// by interval indices
const filtered = ref<boolean[]>([]);

export function useScatterFilterTag() {
  const {allUniques} = useTagUniques();
  const {intervals} = useIntervals();

  /**
   * return true to continue
   * return false to break
   */
  const iterateTags = (
    allUniques: AllTagUniques,
    callback: (tN: number, tagName: string) => boolean,
  ) => {
    const tagNames = Object.keys(allUniques);
    const indices = tagNames.map((_, i) => i.toString());

    for (let tN = 0; tN < indices.length; tN += 1) {
      const tagName = tagNames[tN];
      const isContinue = callback(tN, tagName);

      if (!isContinue) {
        break;
      }
    }
  };

  const isFilteredBySelection = (
    intervalIndex: number,
    selection: Ref<TagSelection>,
  ): boolean => {
    let isFiltered = false;

    const interval = intervals.value[intervalIndex];

    iterateTags(allUniques.value, (_, tagName) => {
      const selected = selection.value[tagName];
      const tagValues = interval.tags[tagName].join(STRING_DELIMITER);

      // no user selection
      if (selected.length === 0) {
        return true;
      }

      // selected by user
      if (selected.includes(tagValues)) {
        return true;
      }

      isFiltered = true;
      return false;
    });

    return isFiltered;
  };

  const filter = (newSelection: Ref<TagSelection>) => {
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
