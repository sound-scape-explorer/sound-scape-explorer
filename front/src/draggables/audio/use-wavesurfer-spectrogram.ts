import SpectrogramPlugin from 'src/common/spectrogram';
import {useBandSelection} from 'src/composables/use-band-selection';
import {useAudioFourier} from 'src/draggables/audio/use-audio-component';
import {useAudioFile} from 'src/draggables/audio/use-audio-file';
import {useDraggableAudio} from 'src/draggables/audio/use-draggable-audio';
import {useSpectrogramColormap} from 'src/draggables/audio/use-spectrogram-colormap';
import {useWavesurfer} from 'src/draggables/audio/use-wavesurfer';
import {useWavesurferColors} from 'src/draggables/audio/use-wavesurfer-colors';
import {useWavesurferSettings} from 'src/draggables/audio/use-wavesurfer-settings';
import {watch} from 'vue';

export function useWavesurferSpectrogram() {
  const {ws} = useWavesurfer();
  const {band} = useBandSelection();
  const {spectrogram} = useDraggableAudio();
  const {bitDepth} = useAudioFile();
  const {size} = useAudioFourier();
  const {colormap} = useSpectrogramColormap();
  const {colors} = useWavesurferColors();
  const {showDecibels, overflowLegends} = useWavesurferSettings();

  const register = () => {
    if (
      ws.value === null ||
      spectrogram.value === null ||
      band.value === null ||
      bitDepth.value === null
    ) {
      return;
    }

    if (typeof ws.value.spectrogram !== 'undefined') {
      ws.value.destroyPlugin('spectrogram');
    }

    const spectro = SpectrogramPlugin.create({
      container: spectrogram.value,
      labels: true,
      colorMap: colors.value,
      height: 192,
      fftSamples: size.value,
      frequencyMin: band.value.low,
      frequencyMax: band.value.high,
      decibels: showDecibels.value,
      overflowLegends: overflowLegends.value,
      bitDepth: bitDepth.value,
    });

    ws.value.registerPlugins([spectro]);
  };

  watch([size, colormap, showDecibels, overflowLegends, bitDepth], register);

  return {
    register: register,
  };
}
