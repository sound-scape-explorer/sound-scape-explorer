import {useIndicators} from 'src/composables/use-indicators';
import {useLabelSets} from 'src/composables/use-label-sets';
import {ColorCategory} from 'src/constants';
import {useColorSelection} from 'src/draggables/colors/use-color-selection';
import {useLabelNumeric} from 'src/draggables/labels/use-label-numeric';
import {computed} from 'vue';

export function useColorState() {
  const {sets} = useLabelSets();
  const {criteria, category} = useColorSelection();
  const {names} = useIndicators();
  const {isCalculable} = useLabelNumeric();

  const isIndicators = computed(
    () =>
      category.value === ColorCategory.enum.METRICS &&
      names.value?.includes(criteria.value),
  );

  const isLabels = computed<boolean>(() => {
    const properties = Object.keys(sets.value);
    return (
      category.value === ColorCategory.enum.TAGS &&
      properties.includes(criteria.value)
    );
  });

  const isLabelNumeric = computed<boolean>(() => {
    return isLabels.value && isCalculable(criteria.value);
  });

  return {
    isIndicators,
    isLabels,
    isLabelNumeric,
  };
}
