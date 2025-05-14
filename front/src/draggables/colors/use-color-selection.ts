import {useClientSettings} from 'src/composables/use-client-settings';
import {useIndicators} from 'src/composables/use-indicators';
import {useLabelSets} from 'src/composables/use-label-sets';
import {ColorCategory, ColorCriteria} from 'src/constants';
import {ref} from 'vue';

const labelCriterias = ref<string[]>([]);
const indicatorCriterias = ref<string[]>([]);

const criterias = ref<string[]>(ColorCriteria.options);
const criteria = ref<string>(ColorCriteria.enum.cycleDay);
const criteriaIndex = ref<number>(-1);

const category = ref<ColorCategory>(ColorCategory.enum.DEFAULT);

export function useColorSelection() {
  const {sets} = useLabelSets();
  const {names} = useIndicators();
  const {colorsFlavor} = useClientSettings();

  const updateCriterias = () => {
    switch (category.value) {
      case ColorCategory.enum.DEFAULT:
        criterias.value = ColorCriteria.options;
        break;

      case ColorCategory.enum.TAGS:
        criterias.value = labelCriterias.value;
        break;

      case ColorCategory.enum.METRICS:
        criterias.value = indicatorCriterias.value;
        break;
    }
  };

  const updateCriteriaIndex = () => {
    criteriaIndex.value = criterias.value.indexOf(criteria.value);
  };

  const updateLabelCriterias = () => {
    labelCriterias.value = Object.keys(sets.value);
  };

  const updateIndicatorCriterias = () => {
    if (names.value === null) {
      return;
    }

    indicatorCriterias.value = names.value;
  };

  const handleLabelClick = (tagName: string) => {
    if (category.value !== ColorCategory.enum.TAGS) {
      category.value = ColorCategory.enum.TAGS;
    }

    if (criteria.value !== tagName) {
      criteria.value = tagName;
    }
  };

  return {
    flavor: colorsFlavor,
    criteria,
    criterias,
    updateCriterias,
    criteriaIndex,
    updateCriteriaIndex,
    category,
    handleLabelClick,
    updateLabelCriterias,
    updateIndicatorCriterias,
  };
}
