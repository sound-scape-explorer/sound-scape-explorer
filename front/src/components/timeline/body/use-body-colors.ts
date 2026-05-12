import chroma from 'chroma-js';
import {useClientSettings} from 'src/composables/use-client-settings';
import {useConfig} from 'src/composables/use-config';
import {ref} from 'vue';

const scale = ref<string[]>([]);
const highlightMap = ref<Map<string, string>>(new Map());
const activeMap = ref<Map<string, string>>(new Map());

export function useBodyColors() {
  const {config} = useConfig();
  const {colorsFlavor} = useClientSettings();

  const generate = () => {
    if (config.value === null) {
      return;
    }

    const l = config.value.files.length;
    const colors = chroma.scale(colorsFlavor.value).colors(l);
    scale.value = colors;

    const hMap = new Map<string, string>();
    const aMap = new Map<string, string>();

    for (const c of colors) {
      hMap.set(c, chroma(c).darken().css());
      aMap.set(c, chroma(c).brighten().css());
    }

    highlightMap.value = hMap;
    activeMap.value = aMap;
  };

  return {
    scale,
    highlightMap,
    activeMap,
    generate,
  };
}
