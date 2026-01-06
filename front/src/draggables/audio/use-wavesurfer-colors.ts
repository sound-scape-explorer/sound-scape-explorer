import libColormap from 'colormap';
import {type RGBA} from 'src/common/spectrogram';
import {useClientSettings} from 'src/composables/use-client-settings';
import {computed} from 'vue';

export function useWavesurferColors() {
  const {spectrogramColorMap} = useClientSettings();

  const colors = computed(() => {
    const newColors = libColormap({
      colormap: spectrogramColorMap.value,
      nshades: 256,
      format: 'float',
    });

    return newColors as RGBA[] & {length: 256};
  });

  return {
    colors,
  };
}
