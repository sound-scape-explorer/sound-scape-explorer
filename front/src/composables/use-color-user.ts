import chroma, {type Scale} from 'chroma-js';
import {useClientSettings} from 'src/composables/use-client-settings';
import {useColorSelection} from 'src/draggables/colors/use-color-selection';
import {computed, ref} from 'vue';

const scale = ref<Scale>(chroma.scale());

export function useColorUser() {
  const {flavor} = useColorSelection();
  const {isColorMapSwapped} = useClientSettings();

  const domain = computed(() => {
    if (isColorMapSwapped.value) {
      return [1, 0];
    }

    return [0, 1];
  });

  const generateScale = () => {
    const newScale = chroma.scale(flavor.value);
    scale.value = newScale.domain(domain.value).mode('hsl');
  };

  return {
    domain,
    scale,
    generateScale,
  };
}
