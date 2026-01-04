import chroma from 'chroma-js';
import {useClientSettings} from 'src/composables/use-client-settings';
import {useConfig} from 'src/composables/use-config';
import {ref} from 'vue';

const scale = ref();

export function useBodyColors() {
  const {config} = useConfig();
  const {colorsFlavor} = useClientSettings();

  const generate = () => {
    if (config.value === null) {
      return;
    }

    const l = config.value.files.length;
    scale.value = chroma.scale(colorsFlavor.value).colors(l);
  };

  return {
    scale,
    generate,
  };
}
