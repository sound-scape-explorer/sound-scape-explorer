import libColormap from 'colormap';
import {type RGBA} from 'src/common/spectrogram';
import {useSpectrogramColormap} from 'src/draggables/audio/spectrogram-colormap';
import {computed} from 'vue';

export function useWavesurferColors() {
  const {colormap} = useSpectrogramColormap();

  const colors = computed(() => {
    // noinspection SpellCheckingInspection
    const colors = libColormap({
      colormap: colormap.value,
      nshades: 256,
      format: 'float',
    });

    return colors as RGBA[] & {length: 256};
  });

  return {
    colors: colors,
  };
}
