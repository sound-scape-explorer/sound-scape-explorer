import {useTagUniques} from 'src/composables/use-tag-uniques';
import {useColorSelection} from 'src/draggables/colors/use-color-selection';
import {ref} from 'vue';

const isEnabled = ref<boolean>(false);

export function useTagNumeric() {
  const {allUniques} = useTagUniques();
  const {criteria} = useColorSelection();

  const isCalculable = (tagName: string) => {
    const tagUniques = allUniques.value[tagName];

    let assumeIsCalculable = true;

    for (const unique of tagUniques) {
      const numeric = Number(unique);

      if (isNaN(numeric)) {
        assumeIsCalculable = false;
        break;
      }
    }

    return assumeIsCalculable;
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
