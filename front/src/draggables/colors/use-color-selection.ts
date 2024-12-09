import {useStorage} from '@vueuse/core';
import {settingDefaults} from 'src/common/setting-defaults';
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
  settingDefaults.colorsFlavor,
);

const criteria = ref<ColorCriteria>('cycleDay');
const category = ref<ColorCategory>('Default');

const categories = ref<ColorCategory[]>(['Default', 'Labels', 'Indicators']);

export function useColorSelection() {
  const {labelProperties} = useStorageLabels();
  const {names} = useIndicators();

  // todo: maybe extract me?
  const criteriaIndex = computed(() => criterias.value.indexOf(criteria.value));

  const reset = () => {
    flavor.value = settingDefaults.colorsFlavor;
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
