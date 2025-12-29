import {CURRENT_SCATTER_LEGEND_ID} from 'src/constants';
import {useColoringState} from 'src/draggables/colors/use-coloring-state';
import {computed} from 'vue';

export function useTagCheckboxSelector(tagName: string) {
  const {option} = useColoringState();

  const selector = computed<string>(() => {
    if (tagName !== option.value) {
      return '';
    }

    return CURRENT_SCATTER_LEGEND_ID;
  });

  return {
    selector,
  };
}
