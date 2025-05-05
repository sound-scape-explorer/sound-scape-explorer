import chroma from 'chroma-js';
import {useConfig} from 'src/composables/use-config';
import {useColorSelection} from 'src/draggables/colors/use-color-selection';
import {ref} from 'vue';

const scale = ref();

export function useBodyColors() {
  const {config} = useConfig();
  const {flavor} = useColorSelection();

  const generate = () => {
    if (config.value === null) {
      return;
    }

    const l = config.value.files.length;
    scale.value = chroma.scale(flavor.value).colors(l);
  };

  return {
    scale,
    generate,
  };
}
