import {useClientSettings} from 'src/composables/use-client-settings';
import {ColorOption} from 'src/constants';
import {useColoringState} from 'src/draggables/colors/use-coloring-state';
import {computed} from 'vue';

export function useColorInvert() {
  const {isColorMapSwapped} = useClientSettings();
  const {option} = useColoringState();

  const invert = () => (isColorMapSwapped.value = !isColorMapSwapped.value);

  const isReversible = computed<boolean>(() => {
    // noinspection RedundantIfStatementJS
    if (
      option.value === ColorOption.enum.HoursInDay ||
      option.value === ColorOption.enum.DayOrNight
    ) {
      return false;
    }

    return true;
  });

  return {
    invert,
    isReversible,
  };
}
