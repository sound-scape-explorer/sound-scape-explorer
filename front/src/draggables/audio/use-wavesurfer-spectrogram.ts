import SpectrogramPlugin from 'src/common/spectrogram';
import {useClientSettings} from 'src/composables/use-client-settings';
import {useViewSelection} from 'src/composables/use-view-selection';
import {useAudioFft} from 'src/draggables/audio/use-audio-fft';
import {useAudioFile} from 'src/draggables/audio/use-audio-file';
import {useAudioFilterFollow} from 'src/draggables/audio/use-audio-filter-follow';
import {useAudioFilters} from 'src/draggables/audio/use-audio-filters';
import {useAudioPlaybackRate} from 'src/draggables/audio/use-audio-playback-rate';
import {useDraggableAudio} from 'src/draggables/audio/use-draggable-audio';
import {useWavesurfer} from 'src/draggables/audio/use-wavesurfer';
import {useWavesurferColors} from 'src/draggables/audio/use-wavesurfer-colors';

export function useWavesurferSpectrogram() {
  const {ws} = useWavesurfer();
  const {band} = useViewSelection();
  const {hpfReadable, lpfReadable} = useAudioFilters();
  const {spectrogram} = useDraggableAudio();
  const {bitDepth} = useAudioFile();
  const {size} = useAudioFft();
  const {colors} = useWavesurferColors();
  const {decibelsDisplay: isDecibelsDisplay, legendOverflow: isLegendOverflow} =
    useClientSettings();
  const {isFollowing} = useAudioFilterFollow();
  const {rate} = useAudioPlaybackRate();

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
      frequencyMin:
        (hpfReadable.value ?? band.value.low) /
        (isFollowing.value ? rate.value : 1),
      frequencyMax:
        (lpfReadable.value ?? band.value.high) /
        (isFollowing.value ? rate.value : 1),
      decibels: isDecibelsDisplay.value,
      overflowLegends: isLegendOverflow.value,
      bitDepth: bitDepth.value,
    });

    ws.value.registerPlugins([spectro]);
  };

  return {
    register,
  };
}
