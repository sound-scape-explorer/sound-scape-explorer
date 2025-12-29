import {useTagUniques} from 'src/composables/use-tag-uniques';
import {useColoringState} from 'src/draggables/colors/use-coloring-state';
import {areStringsDigitizable} from 'src/utils/strings';

export function useTagNumeric() {
  const {isNumericModeEnabled, option} = useColoringState();
  const {filterUniquesByTagName} = useTagUniques();

  const enable = () => {
    const uniques = filterUniquesByTagName(option.value);

    if (!areStringsDigitizable(uniques)) {
      return;
    }

    if (!isNumericModeEnabled.value) {
      isNumericModeEnabled.value = true;
    }
  };

  const disable = () => {
    if (isNumericModeEnabled.value) {
      isNumericModeEnabled.value = false;
    }
  };

  const toggle = () => {
    if (isNumericModeEnabled.value) {
      disable();
      return;
    }

    enable();
  };

  return {
    toggle,
    disable,
  };
}
