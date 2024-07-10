import {useStorageLabels} from 'src/composables/use-storage-labels';
import {useColorSelection} from 'src/draggables/colors/use-color-selection';
import {ref} from 'vue';

const isEnabled = ref<boolean>(false);

export function useLabelsNumeric() {
  const {labelProperties, labelSets} = useStorageLabels();
  const {criteria} = useColorSelection();

  const isCalculable = (property: string) => {
    if (labelProperties.value === null || labelSets.value === null) {
      return false;
    }

    const index = labelProperties.value.indexOf(property);
    const set = labelSets.value[index];

    let payload = true; // is calculable?

    for (const value of set) {
      const numeric = Number(value);

      if (isNaN(numeric)) {
        payload = false;
        break;
      }
    }

    return payload;
  };

  const enable = () => {
    if (!isCalculable(criteria.value)) {
      return;
    }

    if (!isEnabled.value) {
      isEnabled.value = true;
    }
  };

  const disable = () => {
    if (isEnabled.value) {
      isEnabled.value = false;
    }
  };

  const toggle = () => {
    if (isEnabled.value) {
      disable();
      return;
    }

    enable();
  };

  return {
    isCalculable: isCalculable,
    isEnabled: isEnabled,
    toggle: toggle,
  };
}
