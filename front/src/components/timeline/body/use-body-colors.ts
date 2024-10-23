import chroma from 'chroma-js';
import {useFiles} from 'src/composables/use-files';
import {useColorSelection} from 'src/draggables/colors/use-color-selection';
import {ref} from 'vue';

const scale = ref();

export function useBodyColors() {
  const {flavor} = useColorSelection();
  const {files} = useFiles();

  const generate = () => {
    if (files.value === null) {
      return;
    }

    const l = files.value.length;
    scale.value = chroma.scale(flavor.value).colors(l);
  };

  return {
    scale: scale,
    generate: generate,
  };
}
