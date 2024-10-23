import {useIndicators} from 'src/composables/use-indicators';
import {useStorageLabels} from 'src/composables/use-storage-labels';
import {useColorSelection} from 'src/draggables/colors/use-color-selection';
import {useLabelNumeric} from 'src/draggables/labels/use-label-numeric';
import {computed} from 'vue';

export function useColorState() {
  const {labelProperties} = useStorageLabels();
  const {criteria, category} = useColorSelection();
  const {names} = useIndicators();
  const {isCalculable} = useLabelNumeric();

  const isIndicators = computed(
    () =>
      category.value === 'Indicators' && names.value?.includes(criteria.value),
  );

  const isLabels = computed<boolean>(() => {
    if (labelProperties.value === null) {
      return false;
    }

    return (
      category.value === 'Labels' &&
      labelProperties.value.includes(criteria.value)
    );
  });

  const isLabelNumeric = computed<boolean>(() => {
    return isLabels.value && isCalculable(criteria.value);
  });

  return {
    isIndicators: isIndicators,
    isLabels: isLabels,
    isLabelNumeric: isLabelNumeric,
  };
}
