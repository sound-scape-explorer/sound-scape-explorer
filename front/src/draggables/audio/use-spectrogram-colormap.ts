import {SPECTROGRAM_COLOR_MAPS} from 'src/constants';
import {ref} from 'vue';

const colormaps = SPECTROGRAM_COLOR_MAPS;
const colormap = ref<string>(colormaps[0]);

export function useSpectrogramColormap() {
  return {
    colormap: colormap,
  };
}
