import {useTagUniques} from 'src/composables/use-tag-uniques';
import {useColorByTag} from 'src/draggables/colors/use-color-by-tag';
import {useColoringState} from 'src/draggables/colors/use-coloring-state';
import {computed} from 'vue';

export function useTagCheckboxColors(tagName: string) {
  const {isNumericModeEnabled, option} = useColoringState();
  const {getColorByTagIndex, getColorNumeric} = useColorByTag();
  const {allUniques} = useTagUniques();

  const tagUniques = computed(() => allUniques.value[tagName] ?? []);

  const getColor = (tN: number): string | undefined => {
    if (tagName !== option.value) {
      return undefined;
    }

    if (isNumericModeEnabled.value) {
      return getColorNumeric(Number(tagUniques.value[tN]));
    }

    return getColorByTagIndex(tN, tagUniques.value.length);
  };

  return {
    getColor,
    tagUniques,
  };
}
