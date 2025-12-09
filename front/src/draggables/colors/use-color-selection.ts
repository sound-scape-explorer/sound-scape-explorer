import {useAcousticDataReader} from 'src/composables/use-acoustic-data-reader';
import {useAcousticExtractors} from 'src/composables/use-acoustic-extractors';
import {useAcousticSerializer} from 'src/composables/use-acoustic-serializer';
import {useClientSettings} from 'src/composables/use-client-settings';
import {useTagUniques} from 'src/composables/use-tag-uniques';
import {ColorCategory, ColorOption} from 'src/constants';
import {useColorAcousticSeries} from 'src/draggables/colors/use-color-acoustic-series';
import {ref} from 'vue';

const tagOptions = ref<string[]>([]);

const options = ref<string[]>(ColorOption.options);
// an option can be either a builtin coloring key or a tag name (all kind)
const option = ref<string>(ColorOption.enum.HoursInDay);

const category = ref<ColorCategory>(ColorCategory.enum.DEFAULT);

export function useColorSelection() {
  const {allUniques} = useTagUniques();
  const {colorsFlavor: flavor} = useClientSettings();
  const {acousticSlugs, slugToExtractor} = useAcousticExtractors();
  const {read} = useAcousticDataReader();
  const {serialize} = useAcousticSerializer();
  const {set} = useColorAcousticSeries();

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

    const ex = slugToExtractor(option.value);
    const data = await read(ex);
    const series = await serialize(data);
    set(series);
  };

  const handleLabelClick = (tagName: string) => {
    if (category.value !== ColorCategory.enum.TAGS) {
      category.value = ColorCategory.enum.TAGS;
    }

    if (option.value !== tagName) {
      option.value = tagName;
    }
  };

  return {
    flavor,
    option,
    options,
    category,
    handleLabelClick,
    updateOptions,
    updateTagOptions,
    updateAcousticData,
  };
}
