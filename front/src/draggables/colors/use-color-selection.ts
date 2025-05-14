import {useClientSettings} from 'src/composables/use-client-settings';
import {useIndicators} from 'src/composables/use-indicators';
import {useLabelSets} from 'src/composables/use-label-sets';
import {ref} from 'vue';
import {z} from 'zod';

export const ColorCategoryEnum = z.enum(['DEFAULT', 'TAGS', 'METRICS']);
// eslint-disable-next-line no-redeclare
export type ColorCategoryEnum = z.infer<typeof ColorCategoryEnum>;

// todo: move this to zod enumeration
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

const criterias = ref<ColorCriteria[]>(defaultCriterias);
const criteria = ref<ColorCriteria>('cycleDay');
const criteriaIndex = ref<number>(-1);

const category = ref<ColorCategoryEnum>(ColorCategoryEnum.enum.DEFAULT);

export function useColorSelection() {
  const {sets} = useLabelSets();
  const {names} = useIndicators();
  const {colorsFlavor} = useClientSettings();

  const updateCriterias = () => {
    switch (category.value) {
      case ColorCategoryEnum.enum.DEFAULT:
        criterias.value = defaultCriterias;
        break;

      case ColorCategoryEnum.enum.TAGS:
        criterias.value = labelCriterias.value;
        break;

      case ColorCategoryEnum.enum.METRICS:
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
    if (category.value !== ColorCategoryEnum.enum.TAGS) {
      category.value = ColorCategoryEnum.enum.TAGS;
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
    handleLabelClick,
    updateLabelCriterias,
    updateIndicatorCriterias,
  };
}
