import {useLabelSets} from 'src/composables/use-label-sets';
import {useColorByLabel} from 'src/draggables/colors/use-color-by-label';
import {useColorSelection} from 'src/draggables/colors/use-color-selection';
import {useLabelNumeric} from 'src/draggables/labels/use-label-numeric';
import {computed} from 'vue';

export function useLabelCheckboxesColors(property: string) {
  const {criteria} = useColorSelection();
  const {getColorByLabelIndex, getColorNumeric} = useColorByLabel();
  const {sets} = useLabelSets();
  const {isEnabled} = useLabelNumeric();
  const uniques = computed(() => sets.value[property] ?? []);

  const getColor = (p: number): string | undefined => {
    if (property !== criteria.value) {
      return undefined;
    }

    if (isEnabled.value) {
      return getColorNumeric(Number(uniques.value[p]));
    }

    return getColorByLabelIndex(p, uniques.value.length);
  };

  return {
    getColor,
    uniques,
  };
}
