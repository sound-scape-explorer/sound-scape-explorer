import {useTagUniques} from 'src/composables/use-tag-uniques';
import {useColorByTag} from 'src/draggables/colors/use-color-by-tag';
import {useColorSelection} from 'src/draggables/colors/use-color-selection';
import {useTagNumeric} from 'src/draggables/tags/use-tag-numeric';
import {computed} from 'vue';

export function useTagCheckboxColors(tagName: string) {
  const {option} = useColorSelection();
  const {getColorByTagIndex, getColorNumeric} = useColorByTag();
  const {allUniques} = useTagUniques();
  const {isEnabled} = useTagNumeric();

  const tagUniques = computed(() => allUniques.value[tagName] ?? []);

  const getColor = (tN: number): string | undefined => {
    if (tagName !== option.value) {
      return undefined;
    }

    if (isEnabled.value) {
      return getColorNumeric(Number(tagUniques.value[tN]));
    }

    return getColorByTagIndex(tN, tagUniques.value.length);
  };

  return {
    getColor,
    tagUniques,
  };
}
