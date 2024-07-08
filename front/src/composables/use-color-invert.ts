import {useClientSettings} from 'src/composables/use-client-settings';

export function useColorInvert() {
  const {isColorMapSwapped} = useClientSettings();

  const invert = () => (isColorMapSwapped.value = !isColorMapSwapped.value);

  return {
    invert: invert,
  };
}
