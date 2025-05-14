import {useClientSettings} from 'src/composables/use-client-settings';
import {useIndicators} from 'src/composables/use-indicators';
import {useLabelSets} from 'src/composables/use-label-sets';
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

// todo: use enum and rename labels to tags, rename indicators to metrics
const categories = ref<ColorCategory[]>(['Default', 'Labels', 'Indicators']);

export function useColorSelection() {
  const {sets} = useLabelSets();
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
    labelCriterias.value = Object.keys(sets.value) as ColorCriteria[];
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
    criteria,
    criterias,
    updateCriterias,
    criteriaIndex,
    updateCriteriaIndex,
    category,
    categories,
    handleLabelClick,
    updateLabelCriterias,
    updateIndicatorCriterias,
  };
}
