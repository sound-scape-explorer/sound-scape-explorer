import chroma, {type Scale} from 'chroma-js';
import {useColorSelection} from 'src/components/scatter/use-color-selection';
import {useClientSettings} from 'src/composables/use-client-settings';
import {computed} from 'vue';

export function useColorUser() {
  const {flavor} = useColorSelection();
  const {isColorMapSwapped} = useClientSettings();

  // todo: transform this to generator + watcher to instantiate once in SFC
  const scale = computed<Scale>(() => {
    const scale = chroma.scale(flavor.value);
    const domain = isColorMapSwapped.value ? [1, 0] : [0, 1];
    return scale.domain(domain).mode('hsl');
  });

  return {
    scale: scale,
  };
}
