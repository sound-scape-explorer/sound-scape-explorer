import {CURRENT_SCATTER_LEGEND_ID} from 'src/constants';
import {useColorSelection} from 'src/draggables/colors/use-color-selection';
import {computed} from 'vue';

export function useTagCheckboxSelector(tagName: string) {
  const {criteria} = useColorSelection();

  const selector = computed<string>(() => {
    if (tagName !== criteria.value) {
      return '';
    }

    return CURRENT_SCATTER_LEGEND_ID;
  });

  return {
    selector,
  };
}
