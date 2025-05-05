import {useLabelSets} from 'src/composables/use-label-sets';
import {useColorSelection} from 'src/draggables/colors/use-color-selection';
import {ref} from 'vue';

const isEnabled = ref<boolean>(false);

export function useLabelNumeric() {
  const {sets} = useLabelSets();
  const {criteria} = useColorSelection();

  const isCalculable = (property: string) => {
    const labelProperties = Object.keys(sets.value);
    const labelSets = Object.values(sets.value);

    const index = labelProperties.indexOf(property);
    const set = labelSets[index];

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
    isCalculable,
    isEnabled,
    toggle,
    disable,
  };
}
