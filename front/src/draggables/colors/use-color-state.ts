import {useIndicators} from 'src/composables/use-indicators';
import {useTagUniques} from 'src/composables/use-tag-uniques';
import {ColorCategory} from 'src/constants';
import {useColorSelection} from 'src/draggables/colors/use-color-selection';
import {useTagNumeric} from 'src/draggables/tags/use-tag-numeric';
import {computed} from 'vue';

export function useColorState() {
  const {allUniques} = useTagUniques();
  const {criteria, category} = useColorSelection();
  const {names} = useIndicators();
  const {isCalculable} = useTagNumeric();

  const isIndicators = computed(
    () =>
      category.value === ColorCategory.enum.METRICS &&
      names.value?.includes(criteria.value),
  );

  const isLabels = computed<boolean>(() => {
    const properties = Object.keys(allUniques.value);
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
