import {useAcousticExtractors} from 'src/composables/use-acoustic-extractors';
import {useTagUniques} from 'src/composables/use-tag-uniques';
import {ColorCategory} from 'src/constants';
import {useColorSelection} from 'src/draggables/colors/use-color-selection';
import {useTagNumeric} from 'src/draggables/tags/use-tag-numeric';
import {computed} from 'vue';

export function useColorState() {
  const {allUniques} = useTagUniques();
  const {option, category} = useColorSelection();
  const {acousticSlugs} = useAcousticExtractors();
  const {isCalculable} = useTagNumeric();

  const isAcoustic = computed(
    () =>
      category.value === ColorCategory.enum.ACOUSTICS &&
      acousticSlugs.value.includes(option.value),
  );

  const isTag = computed<boolean>(() => {
    const properties = Object.keys(allUniques.value);
    return (
      category.value === ColorCategory.enum.TAGS &&
      properties.includes(option.value)
    );
  });

  const isTagNumeric = computed<boolean>(() => {
    return isTag.value && isCalculable(option.value);
  });

  return {
    isAcoustic,
    isTag,
    isTagNumeric,
  };
}
