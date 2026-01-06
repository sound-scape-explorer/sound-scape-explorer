import chroma, {type Scale} from 'chroma-js';
import {useClientSettings} from 'src/composables/use-client-settings';
import {computed, ref} from 'vue';

const scale = ref<Scale>(chroma.scale());

export function useColorUser() {
  const {isColorMapSwapped, colorsFlavor} = useClientSettings();

  const domain = computed(() => {
    if (isColorMapSwapped.value) {
      return [1, 0];
    }

    return [0, 1];
  });

  const generateScale = () => {
    const newScale = chroma.scale(colorsFlavor.value);
    scale.value = newScale.domain(domain.value).mode('hsl');
  };

  return {
    domain,
    scale,
    generateScale,
  };
}
