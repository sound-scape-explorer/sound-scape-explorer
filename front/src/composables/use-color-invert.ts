import {useClientSettings} from 'src/composables/use-client-settings';
import {useColorSelection} from 'src/draggables/colors/use-color-selection';
import {computed} from 'vue';

export function useColorInvert() {
  const {isColorMapSwapped} = useClientSettings();
  const {criteria} = useColorSelection();

  const invert = () => (isColorMapSwapped.value = !isColorMapSwapped.value);

  const isReversible = computed<boolean>(() => {
    if (criteria.value === 'cycleDay' || criteria.value === 'isDay') {
      return false;
    }

    return true;
  });

  return {
    invert,
    isReversible,
  };
}
