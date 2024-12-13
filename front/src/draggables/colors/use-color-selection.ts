import {useClientSettings} from 'src/composables/use-client-settings';
import {useIndicators} from 'src/composables/use-indicators';
import {useStorageLabels} from 'src/composables/use-storage-labels';
import {ref} from 'vue';

type ColorCategory = 'Default' | 'Labels' | 'Indicators';
type ColorCriteria =
  | 'intervalIndex'
  | 'by1h'
  | 'by10min'
  | 'isDay'
  | 'cycleDay';

const defaultCriterias: ColorCriteria[] = [
  'cycleDay',
  'isDay',
  'intervalIndex',
  'by1h',
  'by10min',
];

const labelCriterias = ref<ColorCriteria[]>([]);
const indicatorCriterias = ref<ColorCriteria[]>([]);
const criteria = ref<ColorCriteria>('cycleDay');
const category = ref<ColorCategory>('Default');
const criterias = ref<ColorCriteria[]>(defaultCriterias);
const criteriaIndex = ref<number>(-1);

const categories = ref<ColorCategory[]>(['Default', 'Labels', 'Indicators']);

export function useColorSelection() {
  const {labelProperties} = useStorageLabels();
  const {names} = useIndicators();
  const {colorsFlavor} = useClientSettings();

  const updateCriterias = () => {
    switch (category.value) {
      case 'Default':
        criterias.value = defaultCriterias;
        break;

      case 'Labels':
        criterias.value = labelCriterias.value;
        break;

      case 'Indicators':
        criterias.value = indicatorCriterias.value;
        break;
    }
  };

  const updateCriteriaIndex = () => {
    criteriaIndex.value = criterias.value.indexOf(criteria.value);
  };

  const updateLabelCriterias = () => {
    if (labelProperties.value === null) {
      return;
    }

    labelCriterias.value = labelProperties.value as ColorCriteria[];
  };

  const updateIndicatorCriterias = () => {
    if (names.value === null) {
      return;
    }

    indicatorCriterias.value = names.value as ColorCriteria[];
  };

  const handleLabelClick = (property: string) => {
    if (category.value !== 'Labels') {
      category.value = 'Labels';
    }

    if (criteria.value !== property) {
      criteria.value = property as ColorCriteria;
    }
  };

  return {
    flavor: colorsFlavor,
    criteria: criteria,
    criterias: criterias,
    updateCriterias: updateCriterias,
    criteriaIndex: criteriaIndex,
    updateCriteriaIndex: updateCriteriaIndex,
    category: category,
    categories: categories,
    handleLabelClick: handleLabelClick,
    updateLabelCriterias: updateLabelCriterias,
    updateIndicatorCriterias: updateIndicatorCriterias,
  };
}
