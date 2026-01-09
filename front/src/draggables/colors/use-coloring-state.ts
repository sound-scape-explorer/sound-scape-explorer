import {useAcousticDataReader} from 'src/composables/use-acoustic-data-reader';
import {useAcousticExtractors} from 'src/composables/use-acoustic-extractors';
import {useAcousticSerializer} from 'src/composables/use-acoustic-serializer';
import {useTagData} from 'src/composables/use-tag-data';
import {useTagUniques} from 'src/composables/use-tag-uniques';
import {ColorCategory, ColorOption} from 'src/constants';
import {useColorAcousticSeries} from 'src/draggables/colors/use-color-acoustic-series';
import {ref} from 'vue';

const category = ref<ColorCategory>(ColorCategory.enum.DEFAULT);
const options = ref<string[]>(ColorOption.options); // gather options depending on the category
const option = ref<string>(ColorOption.enum.HoursInDay);
const tagOptions = ref<string[]>([]); // just shadow copy

const isNumericModeEnabled = ref<boolean>(false);
const numericRangeMin = ref<string>('');
const numericRangeMax = ref<string>('');

const isAcousticDataLoading = ref<boolean>(false);

export function useColoringState() {
  const {allUniques} = useTagUniques();
  const {acousticSlugs, slugToExtractor} = useAcousticExtractors();
  const {read} = useAcousticDataReader();
  const {serialize} = useAcousticSerializer();
  const {set} = useColorAcousticSeries();
  const {getTagPrimitive} = useTagData();

  const updateOptions = () => {
    switch (category.value) {
      case ColorCategory.enum.DEFAULT:
        options.value = ColorOption.options;
        break;

      case ColorCategory.enum.TAGS:
        options.value = tagOptions.value;
        break;

      case ColorCategory.enum.ACOUSTICS:
        options.value = acousticSlugs.value;
        break;
    }
  };

  const updateTagOptions = () => {
    tagOptions.value = Object.keys(allUniques.value);
  };

  const updateAcousticData = async () => {
    if (category.value !== ColorCategory.enum.ACOUSTICS) {
      return;
    }

    isAcousticDataLoading.value = true;

    const ex = slugToExtractor(option.value);
    const data = await read(ex);
    const series = await serialize(data);
    set(series);

    isAcousticDataLoading.value = false;
  };

  const detectNumericRange = () => {
    const {tagUniques} = getTagPrimitive(0, option.value);
    const values = tagUniques.map((v) => Number(v));

    numericRangeMin.value = String(Math.min(...values));
    numericRangeMax.value = String(Math.max(...values));
  };

  const resetNumericRange = () => {
    numericRangeMin.value = '';
    numericRangeMax.value = '';
  };

  return {
    category,
    options,
    option,
    isNumericModeEnabled,
    numericRangeMin,
    numericRangeMax,
    updateOptions,
    updateTagOptions,
    updateAcousticData,
    detectNumericRange,
    resetNumericRange,
    isAcousticDataLoading,
  };
}
