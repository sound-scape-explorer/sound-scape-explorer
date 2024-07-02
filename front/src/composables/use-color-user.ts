import chroma, {type Scale} from 'chroma-js';
import {useColorSelection} from 'src/components/scatter/use-color-selection';
import {computed} from 'vue';

export function useColorUser() {
  const {flavor} = useColorSelection();

  const scale = computed<Scale>(() => {
    return chroma.scale(flavor.value).domain([0, 1]).mode('hsl');
  });

  return {
    scale: scale,
  };
}
