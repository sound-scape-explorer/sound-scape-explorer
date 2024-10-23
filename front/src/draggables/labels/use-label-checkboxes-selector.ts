import {CURRENT_SCATTER_LEGEND_ID} from 'src/constants';
import {useColorSelection} from 'src/draggables/colors/use-color-selection';
import {computed} from 'vue';

export function useLabelCheckboxesSelector(property: string) {
  const {criteria} = useColorSelection();

  const selector = computed<string>(() => {
    if (property !== criteria.value) {
      return '';
    }

    return CURRENT_SCATTER_LEGEND_ID;
  });

  return {
    selector: selector,
  };
}
