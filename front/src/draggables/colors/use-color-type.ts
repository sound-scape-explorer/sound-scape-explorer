import {useAcousticExtractors} from 'src/composables/use-acoustic-extractors';
import {useTagUniques} from 'src/composables/use-tag-uniques';
import {ColorCategory} from 'src/constants';
import {useColoringState} from 'src/draggables/colors/use-coloring-state';
import {areStringsDigitizable} from 'src/utils/strings';
import {computed} from 'vue';

export function useColorType() {
  const {allUniques, filterUniquesByTagName} = useTagUniques();
  const {category, option} = useColoringState();
  const {acousticSlugs} = useAcousticExtractors();

  const isTag = computed<boolean>(() => {
    const properties = Object.keys(allUniques.value);
    return (
      category.value === ColorCategory.enum.TAGS &&
      properties.includes(option.value)
    );
  });

  // TODO: to remove?
  const isTagNumeric = computed<boolean>(() => {
    const uniques = filterUniquesByTagName(option.value);
    return isTag.value && areStringsDigitizable(uniques);
  });

  const isAcoustic = computed(
    () =>
      category.value === ColorCategory.enum.ACOUSTICS &&
      acousticSlugs.value.includes(option.value),
  );

  return {
    isAcoustic,
    isTag,
    isTagNumeric,
  };
}
