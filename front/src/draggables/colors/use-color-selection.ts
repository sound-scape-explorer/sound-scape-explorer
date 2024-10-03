import {useStorage} from '@vueuse/core';
import {SettingDefault} from 'src/common/setting-default';
import {SettingKey} from 'src/common/setting-key';
import {useIndicators} from 'src/composables/use-indicators';
import {useStorageLabels} from 'src/composables/use-storage-labels';
import {type ColorFlavor} from 'src/constants';
import {computed, ref} from 'vue';

type ColorCategory = 'Default' | 'Labels' | 'Indicators';
type ColorCriteria =
  | 'intervalIndex'
  | 'by1h'
  | 'by10min'
  | 'isDay'
  | 'cycleDay';

const flavor = useStorage<ColorFlavor>(
  SettingKey.colorsFlavor,
  SettingDefault.colorsFlavor,
);

const criteria = ref<ColorCriteria>('cycleDay');
const category = ref<ColorCategory>('Default');

const categories = ref<ColorCategory[]>(['Default', 'Labels', 'Indicators']);

export function useColorSelection() {
  const {labelProperties} = useStorageLabels();
  const {names} = useIndicators();

  const reset = () => {
    flavor.value = SettingDefault.colorsFlavor;
  };

  const defaultCriterias = computed(
    () =>
      [
        'cycleDay',
        'isDay',
        'intervalIndex',
        'by1h',
        'by10min',
      ] as ColorCriteria[],
  );

  const labelCriterias = computed(
    () => (labelProperties.value as ColorCriteria[]) ?? [],
  );
  const indicatorCriterias = computed(
    () => (names.value as ColorCriteria[]) ?? [],
  );

  const criterias = computed<ColorCriteria[]>(() => {
    switch (category.value) {
      case 'Default': {
        return defaultCriterias.value;
      }
      case 'Labels': {
        return labelCriterias.value;
      }
      case 'Indicators': {
        return indicatorCriterias.value;
      }
    }
  });

  const handleLabelClick = (property: string) => {
    if (category.value !== 'Labels') {
      category.value = 'Labels';
    }

    if (criteria.value !== property) {
      criteria.value = property as ColorCriteria;
    }
  };

  const criteriaIndex = computed(() => criterias.value.indexOf(criteria.value));
  return {
    reset: reset,
    flavor: flavor,
    criteria: criteria,
    criterias: criterias,
    criteriaIndex: criteriaIndex,
    category: category,
    categories: categories,
    handleLabelClick: handleLabelClick,
  };
}
